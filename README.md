# VAP ERP Documentation & Knowledge Corpus (`erp_docs`)

> **Author and Owner:** VAP ERP Documentation Team  
> **Repository:** `git@github.com:Lakshminaresh-TechOps/erp_docs.git`  
> **Role:** Single Source of Truth (SSOT) for all public-facing customer documentation, Knowledge Base (`/kb`) articles, Gajbot AI customer copilot knowledge base, and official company blog posts (`/blog`).  
> **Security Classification:** **100% Customer-Safe & Public.** Strictly zero internal runbooks, infrastructure credentials, private connection strings, or backend implementation jargon permitted.

---

## 1. Overview and Purpose

`erp_docs` is a dedicated, Git-backed repository containing structured Markdown content for VAP ERP end-users and the public. 

It serves two primary customer-facing experiences:
1. **Public Marketing & Documentation Webapp (`vaperp-web`):**
   - Renders `/kb/*` user guides and `/blog/*` articles as accessible public pages.
2. **Gajbot AI In-App Copilot:**
   - Uses approved published articles to guide end-users through VAP ERP workflows in natural language.

---

## 2. Repository Directory Structure

```text
erp_docs/
├── README.md                           ← Repository guide and editorial policy
├── assets/                             ← High-resolution screenshots, diagrams, UI flows
│   ├── finance/
│   ├── crm/
│   └── inventory/
├── kb/                                 ← Customer Knowledge Base articles (for /kb and Gajbot)
│   ├── 01_getting_started/             ← Onboarding, navigation, 2FA/MFA security
│   ├── 02_finance_and_invoicing/       ← Quotations, tax invoices, receipts, payment tracking
│   ├── 03_leads_and_crm/               ← Inbound lead webhooks, pipeline stages, conversions
│   ├── 04_inventory_and_stock/         ← Item catalog, multi-warehouse stock, low-stock reorders
│   ├── 05_hr_and_team/                 ← Employee profiles, attendance, leave, departments
│   ├── 06_customer_support/            ← Support ticketing, customer case history, internal notes
│   └── 07_school_management/          ← Student records, fee collection ledgers
└── blog/                               ← Official company insights & founder updates
    ├── 2026-09-07-bootstrapping-vap-erp.md
    └── 2026-09-08-architecting-zero-seat-tax-business-software.md
```

---

## 3. Editorial & Writing Standards

1. **Strict Customer Perspective:**
   - Write in plain, direct business language.
   - Explain *how* to accomplish a specific business goal (e.g., "How to issue an invoice for a wholesale customer").
2. **Zero Backend Jargon:**
   - Never disclose implementation technologies, infrastructure names, private services, databases, credentials, internal paths, or operational topology.
   - Never reference HTTP status codes (`502`, `504`, `500`). Use human explanations ("The connection timed out; please check your network and refresh").
3. **Standard Frontmatter Required:**
   Every article must include frontmatter metadata:
   ```yaml
   ---
   title: "Creating and Sending Tax Invoices"
   description: "Step-by-step guide to generating professional, tax-compliant invoices in VAP ERP."
   author: "VAP ERP Team"
   publishedAt: "2026-09-07"
   status: "published" # 'draft' | 'published'
   category: "Finance"
   tags: ["Invoicing", "Tax", "Finance"]
   ---
   ```
4. **Draft Gating:**
   - Articles marked `status: "draft"` are automatically skipped during static web generation and vector embeddings ingestion.

---

## 4. Contributing & Version Control

- All updates follow Git version control.
- Commits are signed and reviewed before merging to `main`.
- To preview changes locally, run `npm run dev` inside `erp_platform/vaperp-web`.
