---
title: "Admin: Department Managers and Resignations"
description: "For organisation admins: name department managers, set the notice period, choose which admins approve resignations, see every resignation, keep a leaver's access longer, and what happens on the last working day."
author: "VAP ERP Team"
publishedAt: "2026-11-09"
updatedAt: "2026-11-09"
status: "published"
category: "Organisation & Admin"
module: "admin"
audience: "tenant_admin"
tags: ["Admin", "Departments", "Managers", "Resignations", "Notice period", "Offboarding"]
---

# Admin: Department Managers and Resignations

People resign in **My Profile → Resignation**. As an organisation admin you decide who approves, how long the notice period is, and how long a leaver keeps their sign-in.

---

## 1. Naming Department Managers

Department managers approve the resignations of people in their department.

1. Open **Admin → Departments**. The **Managers** column shows who manages each department, or **No managers**.
2. Click **Managers** next to a department.
3. Tick the people who manage it. You can search by name or email.
4. Click **Save**.

Only organisation (staff) logins can be managers. Module users, such as teachers placed by the School module, cannot.

If a department has no manager, organisation admins approve its resignations.

---

## 2. Admin → Resignations

Open **Admin → Resignations** (under People & access).

**Notice period**
- Set the number of days and click **Save**. It applies to people who resign in My Profile without an HR employee record.
- **0** means there is no notice period.
- People with an HR employee record follow the notice period on their HR record.

**Organisation admins**
- By default, every organisation admin can approve resignations.
- Click **Stop approving** for an admin who should not, for example an IT admin. Click **Approve resignations** to switch it back on.

**All resignations**
- The list shows every resignation made in My Profile: person, department, submitted, last working day and status.
- People with an HR employee record are approved and processed in HR. They are listed in **HR → Resignations**.

---

## 3. Keeping a Leaver's Access Longer

When a resignation is accepted, the list shows *Sign-in ends after* the last working day.

1. Click **Keep access until…**
2. Choose a later day and click **Save**.

The day cannot be before the agreed last working day, or in the past. The sign-in is switched off during the night after the day you choose.

---

## 4. What Happens on the Last Working Day

Every night VAP ERP checks for accepted resignations whose last day has passed:

- the person's **sign-in is switched off**, exactly as **Admin → Users → Deactivate** does. They are signed out everywhere and their seat is freed;
- the person is marked as **left**, with their last working day;
- the resignation shows **Left** (or *Sign-in switched off*).

This applies to resignations made in My Profile and to those approved in HR. Nothing is deleted: an admin can switch the sign-in back on in **Admin → Users**.

**The organisation owner is never switched off automatically**, because that would lock the organisation out of its own administration. If the owner resigns, contact VAP ERP support to hand the owner role to someone else first. The owner's sign-in is then switched off on the next night.

---

## 5. Frequently Asked Questions

**"A manager says the resignation is not waiting for them."**
Check that they are ticked as a manager of that person's department in **Admin → Departments → Managers**.

**"What if a department has no manager and every admin has stopped approving?"**
Then the organisation admins still approve, so a resignation is never stuck. Name a manager to send them to the right person.

**"Someone left yesterday but still needed to finish a handover."**
Their sign-in can be switched back on in **Admin → Users**. Next time, use **Keep access until…** before the last working day passes.
