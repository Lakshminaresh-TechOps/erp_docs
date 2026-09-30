#!/usr/bin/env node
// Customer knowledge content validator for pull requests (WB7.1 gap G4).
// Author and owner: Parihar Naresh Singh, Founder and Lead Developer, VAP ERP.
//
// Validation only: no network access, no credentials, no mutation. The same
// rules and stable issue codes are enforced again, authoritatively, by the
// GajBot ingestion service before any vector is written
// (gajbot-service/internal/knowledge/validator.go); a parity test keeps both
// implementations aligned.
//
// Usage: node scripts/validate-kb.mjs [root] [--json]

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CODES = {
  FRONT_MATTER_MISSING: 'FRONT_MATTER_MISSING',
  FRONT_MATTER_MALFORMED: 'FRONT_MATTER_MALFORMED',
  META_MISSING: 'META_MISSING',
  META_INVALID: 'META_INVALID',
  SIZE: 'SIZE',
  FORBIDDEN_TERM: 'FORBIDDEN_TERM',
  SECRET: 'SECRET',
  SENSITIVE_DATA: 'SENSITIVE_DATA',
  INTERNAL_PATH: 'INTERNAL_PATH',
  LINK_MALFORMED: 'LINK_MALFORMED',
  LINK_BROKEN: 'LINK_BROKEN',
  LINK_UNSAFE: 'LINK_UNSAFE',
  MERMAID_INVALID: 'MERMAID_INVALID',
  CLAIM_UNSUPPORTED: 'CLAIM_UNSUPPORTED',
  STRUCTURE: 'STRUCTURE',
};

const FORBIDDEN_TERMS = ['Fastify', 'PostgreSQL', 'Cloud Run', 'gRPC', 'Docker', 'Nginx', 'JWT', 'Qdrant', 'Cloudflare Workers', 'schema_migrations', 'ops_control', 'DATABASE_URL', 'sk_live_', 'AKIA'];
const REQUIRED_META = ['title', 'description', 'author', 'publishedAt', 'updatedAt', 'status', 'module', 'audience', 'tags'];
const STATUSES = new Set(['published', 'draft', 'archived']);
const MAX_ARTICLE_BYTES = 96 * 1024;
const IDENT = /^[a-z][a-z0-9_]*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const KEY = /^[A-Za-z][A-Za-z0-9_]*$/;

const issue = (code, message) => `${code}: ${message}`;

function splitFrontMatter(content) {
  const normalized = content.replace(/^[\ufeff\r\n\t ]+/, '').replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) return { ok: false, front: '', body: content };
  const rest = normalized.slice(3);
  const at = rest.indexOf('\n---');
  if (at < 0) return { ok: false, front: '', body: content };
  return { ok: true, front: rest.slice(0, at).trim(), body: rest.slice(at + 4).trim() };
}

function unquote(value) {
  const v = value.trim();
  if (v === '') return { ok: true, value: '' };
  if (v[0] === '"' || v[0] === "'") {
    const q = v[0];
    if (v.length < 2 || v[v.length - 1] !== q) return { ok: false };
    const inner = v.slice(1, -1);
    if (q === "'" && inner.includes("'")) return { ok: false };
    if (q === '"' && inner.split('\\"').join('').includes('"')) return { ok: false };
    return { ok: true, value: inner.split('\\"').join('"') };
  }
  return { ok: true, value: v };
}

function parseInlineList(value) {
  const v = value.trim();
  if (!v.startsWith('[') || !v.endsWith(']')) return null;
  const inner = v.slice(1, -1).trim();
  if (inner === '') return [];
  const items = [];
  let cur = '';
  let quote = '';
  for (const ch of inner) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = '';
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
    } else if (ch === ',') {
      items.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (quote) return null;
  items.push(cur);
  const out = [];
  for (const it of items) {
    const u = unquote(it);
    if (!u.ok || u.value.trim() === '') return null;
    out.push(u.value);
  }
  return out;
}

function parseFrontMatter(front) {
  const meta = {};
  let tags = [];
  const issues = [];
  let pending = '';
  for (const raw of front.split('\n')) {
    const line = raw.replace(/\r$/, '');
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    if (trimmed.startsWith('- ') || trimmed === '-') {
      if (!pending) {
        issues.push(issue(CODES.FRONT_MATTER_MALFORMED, 'unexpected list item in front matter'));
        continue;
      }
      const u = unquote(trimmed.replace(/^-/, '').trim());
      if (!u.ok || u.value === '') {
        issues.push(issue(CODES.FRONT_MATTER_MALFORMED, 'malformed list item in front matter'));
        continue;
      }
      if (pending === 'tags') tags.push(u.value);
      continue;
    }
    pending = '';
    if (line.startsWith('\t') || line.startsWith(' ')) {
      issues.push(issue(CODES.FRONT_MATTER_MALFORMED, 'unsupported indentation in front matter'));
      continue;
    }
    const i = line.indexOf(':');
    if (i <= 0) {
      issues.push(issue(CODES.FRONT_MATTER_MALFORMED, 'front matter line is not key: value'));
      continue;
    }
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    if (!KEY.test(key)) {
      issues.push(issue(CODES.FRONT_MATTER_MALFORMED, 'invalid front matter key'));
      continue;
    }
    if (Object.prototype.hasOwnProperty.call(meta, key)) {
      issues.push(issue(CODES.FRONT_MATTER_MALFORMED, `duplicate front matter key: ${key}`));
      continue;
    }
    if (value === '') {
      meta[key] = '';
      pending = key;
      continue;
    }
    if (value.startsWith('[')) {
      const list = parseInlineList(value);
      if (list === null) {
        issues.push(issue(CODES.FRONT_MATTER_MALFORMED, `malformed list for ${key}`));
        meta[key] = '';
        continue;
      }
      meta[key] = list.join(',');
      if (key === 'tags') tags = list;
      continue;
    }
    const u = unquote(value);
    if (!u.ok) {
      issues.push(issue(CODES.FRONT_MATTER_MALFORMED, `unterminated quoted value for ${key}`));
      meta[key] = '';
      continue;
    }
    meta[key] = u.value;
  }
  if (pending === 'tags' && tags.length > 0) meta.tags = tags.join(',');
  return { meta, tags, issues };
}

const isRealDate = (s) => {
  if (!DATE.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
};

function validateMeta(m) {
  const out = [];
  const len = (s) => [...s].length;
  if (m.title && (len(m.title) < 3 || len(m.title) > 120)) out.push(issue(CODES.META_INVALID, 'invalid metadata field: title length'));
  if (m.description && (len(m.description) < 10 || len(m.description) > 300)) out.push(issue(CODES.META_INVALID, 'invalid metadata field: description length'));
  if (m.module && !IDENT.test(m.module)) out.push(issue(CODES.META_INVALID, 'invalid metadata field: module'));
  if (m.audience && !IDENT.test(m.audience)) out.push(issue(CODES.META_INVALID, 'invalid metadata field: audience'));
  const pOk = !m.publishedAt || isRealDate(m.publishedAt);
  const uOk = !m.updatedAt || isRealDate(m.updatedAt);
  if (m.publishedAt && !pOk) out.push(issue(CODES.META_INVALID, 'invalid metadata field: publishedAt'));
  if (m.updatedAt && !uOk) out.push(issue(CODES.META_INVALID, 'invalid metadata field: updatedAt'));
  if (pOk && uOk && m.publishedAt && m.updatedAt && m.updatedAt < m.publishedAt) out.push(issue(CODES.META_INVALID, 'invalid metadata field: updatedAt precedes publishedAt'));
  for (const tag of m.tags) {
    if (tag.trim() === '' || [...tag].length > 40) {
      out.push(issue(CODES.META_INVALID, 'invalid metadata field: tags'));
      break;
    }
  }
  if (m.tags.length > 20) out.push(issue(CODES.META_INVALID, 'invalid metadata field: tags count'));
  return out;
}

const SECRET_PATTERNS = [
  /(sk_live_[A-Za-z0-9]+|ghp_[A-Za-z0-9]+|AKIA[0-9A-Z]{16,})/i,
  /(db_url\s*=\s*|postgresql:\/\/[^\s]+)/i,
  /(password\s*[:=]\s*[^\s]+|token\s*[:=]\s*[^\s]+)/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}/,
  /AIza[0-9A-Za-z_-]{35}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /bearer\s+[A-Za-z0-9._~+/=-]{20,}/i,
];

const ALLOWED_EMAIL_DOMAINS = new Set(['vaperp.com', 'example.com', 'example.org', 'example.net', 'company.com', 'yourcompany.com']);

function luhn(digits) {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function validateSensitive(content) {
  const out = [];
  for (const m of content.matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)) {
    if (!ALLOWED_EMAIL_DOMAINS.has(m[1].toLowerCase())) {
      out.push(issue(CODES.SENSITIVE_DATA, 'contains an email address outside approved example or company domains'));
      break;
    }
  }
  if (/(?:\+91[\s-]?)?\b[6-9]\d{9}\b/.test(content)) out.push(issue(CODES.SENSITIVE_DATA, 'contains a phone number'));
  if (/\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(content) || /\b\d{4}\s\d{4}\s\d{4}\b/.test(content) || /\b\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\b/.test(content)) {
    out.push(issue(CODES.SENSITIVE_DATA, 'contains a government or tax identifier'));
  }
  for (const m of content.match(/\b(?:\d[ -]?){13,19}\b/g) || []) {
    const digits = m.replace(/[ -]/g, '');
    if (digits.length >= 13 && digits.length <= 19 && luhn(digits)) {
      out.push(issue(CODES.SENSITIVE_DATA, 'contains a payment card number'));
      break;
    }
  }
  if (/\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/.test(content)
    || /(vaperp-prod-[a-z0-9-]+|[a-z0-9-]+\.run\.app|iam\.gserviceaccount\.com|projects\/[a-z0-9-]{6,}\/)/i.test(content)) {
    out.push(issue(CODES.SENSITIVE_DATA, 'contains private network or infrastructure identifiers'));
  }
  return out;
}

const INTERNAL_PATH_PATTERNS = [
  /\b[a-z]:\\/i,
  /(^|[\s(`"'])\/(home|users|etc|var|opt|usr|srv|app|root|tmp)\//im,
  /\berp_(backend|platform|infra|common|deploy|migrations|webapps|planner)\b/i,
  /(^|[\s(`"'])\.env(\.[a-z]+)?\b/im,
  /\bservices\/[a-z-]+-service\b/i,
  /http:\/\/(localhost|127\.0\.0\.1)/i,
  /127\.0\.0\.1/,
];

const CLAIM_PATTERNS = [
  /\b\d+[kKmM]?\+?\s+(enterprises|customers|countries|users)\b/i,
  /\b(bank[- ]grade|military[- ]grade)\b/i,
  /\b100%\s+(uptime|secure|guaranteed|available)\b/i,
  /\bSOC ?2\b|\bISO ?27001\b|\bPCI[- ]?DSS\b|\bHIPAA\b/i,
  /\b99(\.\d+)?%\s+(uptime|availability)\b/i,
  /\b(zero|no) downtime\b|\bunhackable\b|\bunbreakable\b|\bimpenetrable\b/i,
];

function stripFences(content) {
  const out = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out.join('\n') + '\n';
}

function stripCode(content) {
  return stripFences(content).split('\n').map((l) => l.replace(/`[^`\n]*`/g, '')).join('\n');
}

function slug(text) {
  let out = '';
  for (const ch of text.trim().toLowerCase()) {
    if (/[a-z0-9_-]/.test(ch)) out += ch;
    else if (ch === ' ') out += '-';
  }
  return out;
}

function anchorsOf(content) {
  const set = new Set();
  for (const line of stripFences(content).split('\n')) {
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line.replace(/\r$/, ''));
    if (m) set.add(slug(m[2]));
  }
  return set;
}

function validateLinks(content, relPath, corpus) {
  const out = [];
  const prose = stripCode(content);
  const self = anchorsOf(content);
  const linkRe = /!?\[[^\]\n]*\]\(([^)\n]*)\)/g;
  const all = prose.match(linkRe) || [];
  if ((prose.split('](').length - 1) !== all.length) out.push(issue(CODES.LINK_MALFORMED, 'contains a malformed markdown link'));
  for (const match of prose.matchAll(linkRe)) {
    const raw = match[1].trim();
    if (raw === '') {
      out.push(issue(CODES.LINK_MALFORMED, 'contains an empty link target'));
      continue;
    }
    let target = raw;
    const ws = raw.search(/[ \t]/);
    if (ws >= 0) {
      const rest = raw.slice(ws).trim();
      if (!(rest.startsWith('"') && rest.endsWith('"') && rest.length >= 2)) {
        out.push(issue(CODES.LINK_MALFORMED, 'contains a link target with whitespace'));
        continue;
      }
      target = raw.slice(0, ws);
    }
    target = target.replace(/^<|>$/g, '');
    const lower = target.toLowerCase();
    if (lower.startsWith('http://localhost') || lower.startsWith('http://127.0.0.1')) out.push(issue(CODES.INTERNAL_PATH, 'contains internal localhost/private path reference'));
    else if (lower.startsWith('file:') || lower.includes('c:\\') || lower.includes('/users/') || lower.includes('/home/')) out.push(issue(CODES.INTERNAL_PATH, 'contains internal filesystem path reference'));
    else if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) out.push(issue(CODES.LINK_UNSAFE, 'contains unsafe markdown link scheme'));
    else if (lower.startsWith('http://')) out.push(issue(CODES.LINK_UNSAFE, 'external links must use https'));
    else if (lower.startsWith('https://')) {
      if (target.length <= 'https://'.length || /[<>\\]/.test(target)) out.push(issue(CODES.LINK_MALFORMED, 'contains a malformed https link'));
    } else if (lower.startsWith('mailto:') || lower.startsWith('tel:')) {
      if (target.length <= 'mailto:'.length) out.push(issue(CODES.LINK_MALFORMED, 'contains an empty contact link'));
    } else if (target.startsWith('#')) {
      if (!self.has(target.slice(1))) out.push(issue(CODES.LINK_BROKEN, 'in-page link target does not exist'));
    } else if (target.startsWith('/kb/') || target.startsWith('/blog/')) {
      // Website routes are resolved by the site build.
    } else if (target.startsWith('/') || target.includes('://')) {
      out.push(issue(CODES.LINK_UNSAFE, 'contains an unsupported absolute link'));
    } else {
      let file = target;
      let frag = '';
      const hash = file.indexOf('#');
      if (hash >= 0) {
        frag = file.slice(hash + 1);
        file = file.slice(0, hash);
      }
      const q = file.indexOf('?');
      if (q >= 0) file = file.slice(0, q);
      if (!file.toLowerCase().endsWith('.md')) {
        out.push(issue(CODES.LINK_UNSAFE, 'relative links must reference approved markdown articles'));
        continue;
      }
      if (!corpus) continue;
      const resolved = posix.normalize(posix.join(posix.dirname(relPath.split('\\').join('/')), file));
      const anchors = corpus.get(resolved);
      if (!anchors) out.push(issue(CODES.LINK_BROKEN, 'relative link target does not exist in the approved corpus'));
      else if (frag && !anchors.has(frag)) out.push(issue(CODES.LINK_BROKEN, 'link anchor does not exist in the target article'));
    }
  }
  return out;
}

const MERMAID_TYPES = new Set(['graph', 'flowchart', 'sequencediagram', 'classdiagram', 'statediagram', 'statediagram-v2', 'erdiagram', 'gantt', 'pie', 'journey', 'mindmap', 'timeline', 'gitgraph', 'quadrantchart', 'requirementdiagram']);

function checkMermaid(block) {
  const out = [];
  const first = block.map((l) => l.trim()).find((t) => t !== '' && !t.startsWith('%%'));
  if (!first) return [issue(CODES.MERMAID_INVALID, 'empty Mermaid diagram')];
  if (!MERMAID_TYPES.has(first.split(/\s+/)[0].toLowerCase())) out.push(issue(CODES.MERMAID_INVALID, 'unknown Mermaid diagram type'));
  const joined = block.join('\n');
  const lowered = joined.toLowerCase();
  if (lowered.includes('<script') || lowered.includes('javascript:') || /^\s*click\s/im.test(joined)) out.push(issue(CODES.MERMAID_INVALID, 'Mermaid diagram contains scripted interaction'));
  if ((joined.split('"').length - 1) % 2 !== 0) out.push(issue(CODES.MERMAID_INVALID, 'Mermaid diagram has unbalanced quotes'));
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  let inQuote = false;
  for (const ch of joined) {
    if (ch === '"') {
      inQuote = !inQuote;
      continue;
    }
    if (inQuote) continue;
    if (pairs[ch]) stack.push(ch);
    else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.length === 0 || pairs[stack[stack.length - 1]] !== ch) {
        out.push(issue(CODES.MERMAID_INVALID, 'Mermaid diagram has unbalanced brackets'));
        return out;
      }
      stack.pop();
    }
  }
  if (stack.length) out.push(issue(CODES.MERMAID_INVALID, 'Mermaid diagram has unbalanced brackets'));
  return out;
}

function validateMermaid(content) {
  const out = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t.startsWith('```')) continue;
    const lang = t.slice(3).trim().toLowerCase();
    if (lang !== 'mermaid') {
      for (i++; i < lines.length && !lines[i].trim().startsWith('```'); i++);
      continue;
    }
    const block = [];
    let closed = false;
    for (i++; i < lines.length; i++) {
      if (lines[i].trim().startsWith('```')) {
        closed = true;
        break;
      }
      block.push(lines[i]);
    }
    if (!closed) {
      out.push(issue(CODES.MERMAID_INVALID, 'unterminated Mermaid code block'));
      continue;
    }
    out.push(...checkMermaid(block));
  }
  return out;
}

export function validateArticle(relPath, content, corpus = null) {
  let issues = [];
  if (content.trim() === '') issues.push(issue(CODES.STRUCTURE, 'content is empty'));
  if (Buffer.byteLength(content) > MAX_ARTICLE_BYTES) issues.push(issue(CODES.SIZE, 'article exceeds maximum customer corpus size'));
  const fm = splitFrontMatter(content);
  if (!fm.ok) issues.push(issue(CODES.FRONT_MATTER_MISSING, 'missing YAML front matter'));
  const { meta, tags, issues: parseIssues } = parseFrontMatter(fm.front);
  issues.push(...parseIssues);
  for (const key of REQUIRED_META) {
    if (key === 'tags') {
      if (tags.length === 0 && (meta.tags || '').trim() === '') issues.push(issue(CODES.META_MISSING, 'missing metadata field: tags'));
      continue;
    }
    if ((meta[key] || '').trim() === '') issues.push(issue(CODES.META_MISSING, `missing metadata field: ${key}`));
  }
  const status = (meta.status || '').replace(/^["' ]+|["' ]+$/g, '').toLowerCase();
  if (status && !STATUSES.has(status)) issues.push(issue(CODES.META_INVALID, 'invalid metadata field: status'));
  issues.push(...validateMeta({ title: meta.title || '', description: meta.description || '', module: meta.module || '', audience: meta.audience || '', publishedAt: meta.publishedAt || '', updatedAt: meta.updatedAt || '', tags }));
  if (issues.length === 0 && (status === 'draft' || status === 'archived')) return { valid: true, excluded: true, issues: [] };

  for (const term of FORBIDDEN_TERMS) if (content.includes(term)) issues.push(issue(CODES.FORBIDDEN_TERM, `contains forbidden internal term: ${term}`));
  const lower = content.toLowerCase();
  if (lower.includes('fastify') || lower.includes('postgresql')) issues.push(issue(CODES.FORBIDDEN_TERM, 'contains backend jargon not suitable for customer knowledge'));
  if (SECRET_PATTERNS.some((re) => re.test(content))) issues.push(issue(CODES.SECRET, 'contains secret-like content'));
  issues.push(...validateSensitive(content));
  if (INTERNAL_PATH_PATTERNS.some((re) => re.test(content))) issues.push(issue(CODES.INTERNAL_PATH, 'contains internal localhost/private path reference'));
  issues.push(...validateLinks(content, relPath, corpus));
  issues.push(...validateMermaid(content));
  if (CLAIM_PATTERNS.some((re) => re.test(content))) issues.push(issue(CODES.CLAIM_UNSUPPORTED, 'contains unsupported customer claim'));
  if (!/^#\s+\S/m.test(fm.body)) issues.push(issue(CODES.STRUCTURE, 'missing article title heading'));
  if (!/^##\s+\S/m.test(fm.body)) issues.push(issue(CODES.STRUCTURE, 'missing section heading'));
  issues = [...new Set(issues)];
  return { valid: issues.length === 0, excluded: false, issues };
}

function discover(root) {
  const files = [];
  for (const dir of ['kb', 'blog']) {
    const base = join(root, dir);
    if (!existsSync(base)) continue;
    const walk = (d) => {
      for (const name of readdirSync(d)) {
        const p = join(d, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (name.toLowerCase().endsWith('.md')) files.push(p);
      }
    };
    walk(base);
  }
  return files.sort();
}

export function validateCorpus(root) {
  const files = discover(root);
  const contents = new Map();
  const index = new Map();
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    const rel = relative(root, f).split('\\').join('/');
    contents.set(f, text);
    index.set(rel, anchorsOf(text));
  }
  const invalid = {};
  let excluded = 0;
  for (const f of files) {
    const rel = relative(root, f).split('\\').join('/');
    const result = validateArticle(rel, contents.get(f), index);
    if (result.excluded) excluded++;
    if (result.issues.length) invalid[rel] = result.issues;
  }
  return { files: files.length, excluded, invalid };
}

const invoked = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invoked) {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const root = args.find((a) => !a.startsWith('--')) || join(dirname(fileURLToPath(import.meta.url)), '..');
  const report = validateCorpus(root);
  const failed = Object.keys(report.invalid).length;
  if (json) console.log(JSON.stringify(report, null, 2));
  else if (failed === 0) console.log(`KB validation passed (${report.files} files, ${report.excluded} excluded)`);
  else {
    console.log('KB validation failed:');
    for (const [file, issues] of Object.entries(report.invalid)) {
      console.log(file);
      for (const i of issues) console.log(`  - ${i}`);
    }
  }
  if (report.files === 0) {
    console.error('No approved articles found under kb/ or blog/.');
    process.exit(2);
  }
  process.exit(failed === 0 ? 0 : 1);
}
