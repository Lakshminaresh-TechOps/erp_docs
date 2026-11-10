---
title: "Admin: Changing the Owner of Your Business"
description: "When a business is sold or moves to a new legal entity with a new owner: how the current owner asks for an ownership change, what the VAP ERP team checks, the 48-hour cooling-off and stop link, how the new owner sets up a brand-new login, and what changes on the effective date."
author: "VAP ERP Team"
publishedAt: "2026-11-09"
updatedAt: "2026-11-10"
status: "published"
category: "Organisation & Admin"
module: "admin"
audience: "tenant_admin"
tags: ["Admin", "Ownership", "Owner", "Sale of business", "New owner", "Legal details", "Security"]
---

# Admin: Changing the Owner of Your Business

Use an **ownership change** when the business itself changes hands, for example when it is sold or moved to a new legal entity with a new owner. The VAP ERP team checks every request, and nothing changes until it is approved and the new owner has set up their own login.

---

## 1. Is This the Right Option?

| Situation | What to use |
|-----------|-------------|
| The business is sold, or moves to a new legal entity, with a new owner | **Ownership change** (this article) |
| A mistake in your details, for example a typo in the legal name or a GSTIN typed wrongly | **Admin → Organisation → Correct business details** |
| The same business, but the owner's sign-in should move to a new email, or to another person such as a family member | Contact VAP ERP support to **move the owner role**. This is not an ownership change. |
| You only want to change the trade name or logo | Change them directly in **Admin → Organisation** |

An ownership change needs a **new legal entity**: a change of the legal name, the business structure, the GSTIN or the PAN.

---

## 2. Who Can Ask

Only the **current owner** of the organisation can ask, in **Admin → Ownership** (under Settings). Other admins see the page but cannot start a request.

You can have one ownership change open at a time.

---

## 3. Asking for an Ownership Change

1. Open **Admin → Ownership** and click **Start an ownership change**.
2. Fill in the five parts:
   - **1. The new business:** legal name, business structure, GSTIN or PAN, and the other details of the new entity.
   - **2. The new owner:** their name, email and mobile. Use an email that **has no login in this organisation yet**, and the new owner's own mobile number.
   - Under **You, after the change**, choose **Stay as ordinary staff (without the owner role)** or **Leave: my sign-in is switched off on the effective date**.
   - **3. When and why:** the **effective date**, at least 3 days ahead, and a description of the change, for example *"The business was sold to Meera Exports Pvt Ltd by a sale deed dated 1 November 2026."*
   - **4. Documents:** the transfer document (for example the sale deed), the new business's GST certificate or PAN proof, and the new owner's ID proof. PDF, PNG or JPEG, up to 5 MB each. Only you and the VAP ERP team can see them.
3. Click **Save draft**. A draft is not sent, and you can come back to it.
4. Under **5. Declaration and confirmation**, read the declaration and tick **I have read and accept this declaration**.
5. Click **Send confirmation codes**. A code goes to your email. When confirmation by SMS is available, another code goes to your mobile if your login has one. The codes are valid for 10 minutes.
6. Enter the code (or codes) and click **Send the request**.

You see: *"Sent to the VAP ERP team. You will hear from them; nothing changes until it is approved."*

---

## 4. What the VAP ERP Team Checks

Two different people from the VAP ERP team handle every request: one **reviews** it, and another **approves** it.

- They check the documents, the new business details and the reason.
- **Unpaid VAP ERP invoices** must be settled first. In some cases the approver may let them carry over to the new owner, but only if the new owner accepts them.
- They may **ask for more information**. The page then shows their note. Change the request, send new codes, and send it again.
- They may **not approve** it, with a reason. You can start a new request.

Until it is approved, you can click **Cancel request**.

---

## 5. The 48-Hour Cooling-Off

When the request is approved, a **48-hour cooling-off** starts.

- The current owner receives an email with a **stop link** (and an SMS when available).
- If the change was not asked for by the owner, open the link and click **Stop the ownership change**. Nothing in the organisation changes, and the VAP ERP team is told.
- After the cooling-off, the change can no longer be stopped with the link. Contact VAP ERP support straight away if something is wrong.

---

## 6. The New Owner Sets Up a Brand-New Login

After the cooling-off, the VAP ERP team sends the new owner an **invitation link** by email. It is valid for 7 days. If it expires, the VAP ERP team can send a new one.

The new owner opens the link and completes these steps (the email is confirmed by the link itself):

1. **Your mobile number** (only when confirmation by SMS is available): they confirm it with a code sent by SMS.
2. **Your password**: at least 12 characters, with letters and at least one digit.
3. **Authenticator app**: they scan the QR code with an authenticator app (for example Google Authenticator or Microsoft Authenticator) and enter the 6-digit code it shows. As the owner, they confirm every sign-in with a code from this app.
4. **Confirm and accept**: they check the new business details and accept the VAP ERP terms (and any dues carried over).

**Everything is new for the new owner.** Nothing is carried over from the previous owner's login or from any other login: not the password, not the authenticator, not the email. The login itself is created only on the effective date.

---

## 7. What Happens on the Effective Date

When the new owner has finished onboarding and the effective date has come, VAP ERP makes the change in one step:

- The **new business details** apply. The previous details are kept as history.
- The new GSTIN shows as **not verified** until it is verified again.
- The **previous logo is removed**. The new owner can upload their own in **Admin → Organisation**.
- The **new owner's login** is created and becomes the owner of the organisation.
- The **previous owner loses the owner role**. They stay as ordinary staff or their sign-in is switched off, as chosen in the request.
- Both the previous owner and the new owner are emailed.

The organisation's data, users and records stay as they are. **Invoices keep their details:** invoices issued before the change still show the previous business. Only new invoices show the new business.

---

## 8. Request Statuses

| Status | Meaning |
|--------|---------|
| **Draft (not sent)** | Saved, not sent to the VAP ERP team |
| **Sent; waiting for the VAP ERP team** | Sent, not yet picked up |
| **Being reviewed** | A reviewer is checking it |
| **The VAP ERP team needs more information** | Read their note, change the request and send it again |
| **Waiting for final approval** | Reviewed; waiting for the approver |
| **Approved; cooling-off period** | 48 hours in which the owner can stop it |
| **New owner is being onboarded** | The new owner is setting up their login |
| **Completed** | The new owner owns the organisation |
| **Not approved** | Rejected, with a reason |
| **Cancelled** | Cancelled by the owner or the VAP ERP team |
| **Stopped** | Stopped with the stop link during the cooling-off |

---

## 9. When the Owner Cannot Ask

If the owner cannot be reached, has died, or a court has ordered the transfer, contact **VAP ERP support**. The VAP ERP team can start the ownership change from a support request. They need stronger proof, for example:

- if the owner cannot be reached: an affidavit and the transfer document;
- if the owner has died: the death certificate and a succession or legal heir document;
- for a court order: the order.

The same two-person approval and cooling-off apply. The notice and the stop link still go to the current owner's email (and mobile, when SMS is available). In **Admin → Ownership** the request shows *"The VAP ERP team started this ownership change from a support request"*. It cannot be changed or cancelled there.

---

## 10. Frequently Asked Questions

**"Start an ownership change is not there."**
Only the owner of the organisation can ask. Other admins see *"Only the owner of the organisation can ask for an ownership change."*

**"The new owner's email is refused."**
It already has a login in this organisation. The new owner needs an email with no login here, because their login is brand new.

**"Can the new owner use my email or mobile?"**
No. The previous owner's contact details must always receive the stop link.

**"The new owner says the invitation link no longer works."**
It expired after 7 days or was replaced by a newer one. Ask the VAP ERP team to send a new invitation.

**"I did not ask for this, but I received a stop link."**
Open the link and click **Stop the ownership change**, then contact VAP ERP support.

**"Will our old invoices change?"**
No. Each invoice keeps the business details from the day it was issued.
