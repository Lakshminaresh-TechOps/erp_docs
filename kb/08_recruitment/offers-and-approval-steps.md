---
title: "Recruit: Making Offers and Approval Steps"
description: "Draft an offer from your HR salary bands, set up the approval steps your organisation needs, approve or send back offers, and send the applicant their offer link."
author: "VAP ERP Team"
publishedAt: "2026-11-07"
updatedAt: "2026-11-07"
status: "published"
category: "Recruitment"
module: "recruit"
audience: "hr_manager"
tags: ["Recruit", "Offers", "Approvals", "Salary bands", "Offer letter", "Maker checker"]
---

# Recruit: Making Offers and Approval Steps

An **offer** is drafted by a recruiter, checked by the approvers your organisation chooses, and then sent to the applicant as a private link with a PDF offer letter.

---

## 1. Drafting an Offer

1. Open the applicant's page and click **Make an offer**.
2. Fill in the terms:
   - **Designation**, **Department**, **Location** and **Employment type** (taken from the opening; you can change them).
   - **Joining date**.
   - **Band:** pick one of your HR salary bands. The **Salary slabs** list shows each band's range, and the **Bottom**, **Middle** and **Top** buttons fill in the monthly pay for you.
   - **Monthly pay**. If it is outside the chosen band's range, Recruit asks for a reason, which approvers will see.
   - **Salary structure** (optional), from your HR compensation structures.
3. Save. The offer is a **Draft** and only one live offer is allowed per applicant.

Salary bands and structures are set up in **HR → Settings → Bands / Levels** and **Compensation**.

---

## 2. Setting Up Approval Steps

Open **Recruit → Settings → Offers**. Your organisation can have up to **5 approval steps**, in order. Each step has:

- A **name**, for example *Budget check* or *Final approval*.
- **Who approves it:** a Recruit role that includes *Approve offers*, such as Department manager or Offer approver.
- **Only for the opening's department (optional):** the step goes only to holders of the role who look after the offer's department (set in **Recruit → Team → Departments**).

A common setup:

1. **Budget check** by the *Department manager*, only for the opening's department (for example the SMS manager checks the SMS budget).
2. **Final approval** by the *Offer approver*.

With **no steps**, offers do not need approval and can be sent straight from the draft.

The same tab also sets **Offer link stays open for (days)** (1 to 60, default 7) and the **Offer letter wording**: opening paragraph, terms, closing paragraph, and who signs it. Words such as the applicant's name, designation, pay and joining date are filled in when the offer is sent.

Steps are copied onto an offer when it is sent for approval, so changing the settings never affects an offer that is already waiting.

---

## 3. Approving an Offer

1. The recruiter clicks **Send for approval**. Recruit refuses if a step has nobody who can approve it, and says which one.
2. The offer shows **Waiting for approval** with the step it is at, for example "Budget check, step 1 of 2", and who can approve it.
3. Approvers find it in **Recruit → Offers → Waiting for me**.
4. The approver opens the offer and clicks **Approve** (labelled with the step name), or **Send back** with a note on what should change. Sending back returns the offer to **Draft**.
5. After the last step, the offer is **Approved** and ready to send.

Approval rules:
- Nobody approves an offer they drafted.
- One person approves only one step of the same offer.
- Organisation admins can approve any step unless switched off in **Recruit → Team**.
- Changing an approved offer sends it back to **Draft**, and it needs approval again from the first step.

---

## 4. Sending the Offer

1. Click **Send offer** on an approved offer.
2. Recruit creates the PDF offer letter and shows the **Offer link** once. Copy it and send it to the applicant by email or message.
3. The applicant moves to the **Offer** stage by themselves.

If the link is lost or the offer expired, click **New link**; the old link stops working. Click **Letter** to download the PDF. To cancel a sent offer, click **Withdraw**; its link stops working at once.

---

## 5. Offer Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Being prepared or sent back for changes |
| **Waiting for approval** | At one of the approval steps |
| **Approved** | All steps approved; ready to send |
| **Sent** | The applicant has the link |
| **Accepted** | The applicant accepted; they are now Hired |
| **Declined** | The applicant declined, optionally with a reason |
| **Withdrawn** | Your organisation cancelled the offer |
| **Expired** | The link was not answered in time |

---

## 6. Who Sees Pay

Only people who can read or manage offers see offer pay. Approvers who only approve see the offers waiting for them and the ones they decided.

---

## Related Guides

- [Recruit overview and team access](recruit-overview-and-team-access.md)
- [Offer acceptance and joining](offer-acceptance-and-joining.md)
- [Recruit questions and troubleshooting](recruit-faq-and-troubleshooting.md)
