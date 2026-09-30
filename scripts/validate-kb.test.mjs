// Self-tests for the pull-request content validator (WB7.1 gap G4).
// Author and owner: Parihar Naresh Singh, Founder and Lead Developer, VAP ERP.
// Run: node --test scripts/validate-kb.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateArticle, validateCorpus } from './validate-kb.mjs';

const FRONT = `---
title: "Create an invoice"
description: "Create and send a customer invoice"
author: "VAP ERP Team"
publishedAt: "2026-09-07"
updatedAt: "2026-09-08"
status: "published"
module: "finance"
audience: "finance_manager"
tags: ["invoices", "tax"]
---
`;
const BODY = '\n# Create an invoice\n\n## Overview\nThis guide explains how to create an invoice.\n\n## Steps\nOpen Finance and choose New Invoice.\n';

const codes = (r) => [...new Set(r.issues.map((i) => i.split(':')[0]))].sort();

const negatives = [
  ['missing front matter', '# T\n\n## S\ntext', 'FRONT_MATTER_MISSING'],
  ['invalid status', FRONT.replace('"published"', '"live"') + BODY, 'META_INVALID'],
  ['unterminated quote', FRONT.replace('title: "Create an invoice"', 'title: "Create an invoice') + BODY, 'FRONT_MATTER_MALFORMED'],
  ['forbidden term', FRONT + BODY + '\nThe Fastify service handles this.\n', 'FORBIDDEN_TERM'],
  ['secret', FRONT + BODY + '\nUse sk_live_abcdef1234567890 here.\n', 'SECRET'],
  ['customer email', FRONT + BODY + '\nMail jane@acme-customer.io now.\n', 'SENSITIVE_DATA'],
  ['internal path', FRONT + BODY + '\nOpen /home/deploy/config.\n', 'INTERNAL_PATH'],
  ['javascript link', FRONT + BODY + '\n[x](javascript:alert(1))\n', 'LINK_UNSAFE'],
  ['broken anchor', FRONT + BODY + '\nSee [d](#nope).\n', 'LINK_BROKEN'],
  ['unterminated mermaid', FRONT + BODY + '\n```mermaid\ngraph TD\nA-->B\n', 'MERMAID_INVALID'],
  ['unsupported claim', FRONT + BODY + '\nWe are SOC 2 certified.\n', 'CLAIM_UNSUPPORTED'],
];

for (const [name, content, code] of negatives) {
  test(`rejects ${name}`, () => {
    const result = validateArticle('kb/a.md', content);
    assert.equal(result.valid, false);
    assert.ok(codes(result).includes(code), `expected ${code}, got ${codes(result)}`);
  });
}

test('accepts compliant content with Mermaid and links', () => {
  const content = FRONT + BODY + '\nSee [overview](#overview).\n\n```mermaid\ngraph TD\n  A[Start] --> B(Finish)\n```\n';
  assert.deepEqual(validateArticle('kb/a.md', content).issues, []);
});

test('resolves relative links across the corpus', () => {
  const root = mkdtempSync(join(tmpdir(), 'kb-'));
  mkdirSync(join(root, 'kb', 'a'), { recursive: true });
  writeFileSync(join(root, 'kb', 'a', 'one.md'), FRONT + BODY + '\nSee [two](two.md) and [missing](gone.md).\n');
  writeFileSync(join(root, 'kb', 'a', 'two.md'), FRONT + BODY);
  const report = validateCorpus(root);
  assert.ok(report.invalid['kb/a/one.md'].some((i) => i.startsWith('LINK_BROKEN')));
  assert.equal(report.invalid['kb/a/two.md'], undefined);
});

test('the committed corpus passes validation', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const report = validateCorpus(root);
  assert.ok(report.files > 0, 'corpus must not be empty');
  assert.deepEqual(report.invalid, {});
});
