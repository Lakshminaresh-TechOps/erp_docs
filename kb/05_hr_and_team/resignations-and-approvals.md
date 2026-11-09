---
title: "HR: Resignations and Approvals"
description: "How resignations reach HR: employees resign in My Profile, the department manager and the department HR approve together, and HR then handles the notice period and no-dues checklist. How to set up who approves."
author: "VAP ERP Team"
publishedAt: "2026-11-08"
updatedAt: "2026-11-09"
status: "published"
category: "HR & Team"
module: "hr"
audience: "hr_manager"
tags: ["HR", "Resignations", "Approvals", "Notice period", "Offboarding", "My Profile"]
---

# HR: Resignations and Approvals

In VAP ERP, employees resign in **My Profile → Resignation**. They do not need access to the HR module. When HR has an employee record for the person, the resignation comes to HR and is approved by **two people at the same time**:

- the employee's **department manager**, and
- the employee's **department HR**.

When **both** have approved, the resignation is **accepted**. The employee's status changes to **Notice period**, and the **no-dues clearance** checklist starts.

If either of them disagrees, they **send it back** to the employee with a note. The employee changes it and submits it again, and both approvals start again.

---

## 1. Setting Up Who Approves (Once)

**Department managers are named in Admin**

1. An organisation admin opens **Admin → Departments**.
2. Next to a department, they click **Managers**, tick the people who manage it, and save.

Only organisation (staff) logins can be managers. The same managers approve resignations whether or not HR is used.

**Department HR is set up in HR**

1. Open **HR → Settings → Access**. In the **Resignations** group, give a role the right **Approve as department HR**, and give that role to the right people.
2. Open **HR → Settings → Resignations**. Every person with that right is listed. Click **Departments** next to a person, tick the departments they look after, and click **Save**.

A department HR person approves only for the departments ticked for them. Only people who can edit HR people can change this page.

**Organisation admins**

By default, organisation admins can approve **either step for any department**. An admin can be switched off from approving, for example an IT admin. That switch is in **Admin → Resignations**, under **Organisation admins**.

---

## 2. How an Employee Resigns

The employee opens **My Profile → Resignation**, clicks **Resign**, and fills in the last working day, an optional reason, and, if they wish, a request to waive the notice period. The notice period is counted **from the day they first submit**.

**HR → Resignations** no longer has its own resign form. For your own resignation it shows **Resign in My Profile**.

---

## 3. Approving or Sending Back (Manager and Department HR)

You can act in either place:
- **My Profile → Resignation**, under **Waiting for my approval** (no HR access needed), or
- **HR → Resignations**, under **Waiting for your approval**.

1. Click **Review** on the resignation.
2. Choose one:
   - **Approve.** You can set the **Agreed last working day**. It must respect the notice period, unless the notice is waived.
   - **Send back to the employee.** Write what the employee should change. A note is required.
3. Click **Approve** or **Send back**.

**What happens next**

| Situation | Result |
|-----------|--------|
| Only one step approved | Still **Waiting for approval**; the other step is still open |
| Both steps approved | **Accepted**: status becomes **Notice period**, and the no-dues clearance checklist is created |
| Either person sends it back | **Sent back**: the employee sees who sent it back and the note |

**Rules**

- Nobody can approve **their own** resignation.
- One person approves **only one of the two steps** of the same resignation, even an admin, so that two different people always agree.

---

## 4. After It Is Accepted

- The employee's status becomes **Notice period**.
- On the employee's page (**HR → Employees** → the person), the **No-dues clearance** checklist lists what must be cleared before they leave.
- HR handles the final settlement as usual.
- The employee's **sign-in is switched off automatically** during the night after their last working day. Their seat is freed.

---

## 5. Resignation Statuses

| Status | Meaning |
|--------|---------|
| **Waiting for approval** | Submitted; waiting for the department manager and/or the department HR |
| **Sent back** | Returned to the employee with a note to change and submit again |
| **Accepted** | Both approved; notice period started |
| **Withdrawn** | The employee withdrew it |
| **Rejected** | An older resignation decided before this approval flow |

---

## 6. Troubleshooting

**"A resignation is not in Waiting for your approval."**
- As department HR: you do not look after the employee's department. Ask HR to tick it for you in **HR → Settings → Resignations**.
- As a manager: you are not named as a manager of that department. Ask an organisation admin to add you in **Admin → Departments → Managers**.

**"The employee has no department, so only an organisation admin can approve it."**
Set the employee's department on their page in **HR → Employees**.

**"An employee says they cannot resign in HR."**
That is expected. Everyone resigns in **My Profile → Resignation**.

**"Who can see all resignations?"**
People who can view HR employees, and organisation admins. Approvers who are not HR see only the resignations waiting for them.
