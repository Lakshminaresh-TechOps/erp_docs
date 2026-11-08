---
title: "HR: Resignations and Approvals"
description: "How an employee resigns, how the department manager and the department HR approve it together, how to send a resignation back, and how to set up who approves."
author: "VAP ERP Team"
publishedAt: "2026-11-08"
updatedAt: "2026-11-08"
status: "published"
category: "HR & Team"
module: "hr"
audience: "hr_manager"
tags: ["HR", "Resignations", "Approvals", "Notice period", "Offboarding"]
---

# HR: Resignations and Approvals

In VAP ERP, a resignation is approved by **two people at the same time**:

- the employee's **department manager**, and
- the employee's **department HR**.

When **both** have approved, the resignation is **accepted**. The employee's status changes to **Notice period**, and the **no-dues clearance** checklist starts.

If either of them disagrees, they **send it back** to the employee with a note. The employee changes it and submits it again, and both approvals start again from the beginning.

All of this happens on one page: **HR → Resignations**.

---

## 1. Setting Up Who Approves (HR or Admin, Once)

Approvers are set up in two places.

**Step 1: give the rights in Access**

1. Open **HR → Settings → Access**.
2. In the **Resignations** group, give a role one of these rights:
   - **Approve as department manager**
   - **Approve as department HR**
3. Give that role to the right people.

**Step 2: tick their departments**

1. Open **HR → Settings → Resignations**.
2. Every person with one of the two rights is listed. Click **Departments** next to a person.
3. Tick the departments that person looks after, then click **Save**.

A person approves only for the departments ticked for them. If no department is ticked, the list shows *"No departments ticked yet, so they approve nothing."*

Only people who can edit HR people (the right to edit employees) can change this page.

**Organisation admins**

- By default, organisation admins can approve **either step for any department**.
- An organisation admin can switch this off for an admin who should not approve, for example an IT admin. On **HR → Settings → Resignations**, click **Stop approving** next to that admin. Click **Approve resignations** to switch it back on.

---

## 2. Submitting a Resignation (Employee)

1. Open **HR → Resignations**.
2. Under **My resignation**, click **Submit resignation**.
3. Fill in:
   - **Last working day.** It must respect your notice period, unless the notice is waived.
   - **Reason (optional)**, for example *moving to another city*.
   - **Ask to waive the notice period**, if you want to leave before your notice ends.
4. Click **Submit**.

The page shows your notice period in days. It is counted **from the day you first submit**.

After you submit, **My resignation** shows:
- the status, **Waiting for approval**;
- each approval step, and who has approved it so far;
- who can approve each step.

You can have only **one open resignation** at a time.

**Withdrawing:** while your resignation is waiting or sent back, click **Withdraw**. You can submit a new one later.

---

## 3. Approving or Sending Back (Manager and HR)

Resignations you can act on appear at the top of **HR → Resignations**, under **Waiting for your approval**.

1. Click **Review** on the resignation.
2. If you can approve both steps, for example as an organisation admin, choose **You approve as**: *Department manager* or *Department HR*.
3. Choose one:
   - **Approve.** You can set the **Agreed last working day**. It must respect the notice period, unless the notice is waived. You can add a **Note (optional)**.
   - **Send back to the employee.** Write **What should the employee change?** A note is required.
4. Click **Approve** or **Send back**.

**What happens next**

| Situation | Result |
|-----------|--------|
| Only one step approved | Still **Waiting for approval**; the other step is still open |
| Both steps approved | **Accepted**: status becomes **Notice period**, and the no-dues clearance checklist is created |
| Either person sends it back | **Sent back**: the employee sees who sent it back and the note |

**Rules**

- Nobody can approve **their own** resignation.
- One person approves **only one of the two steps** of the same resignation, even if they hold both rights or are an admin.
- A step that is already approved cannot be approved again.

---

## 4. When a Resignation Is Sent Back (Employee)

1. Open **HR → Resignations**. **My resignation** shows **Sent back** and the note, for example *"Priya sent it back: Please give the full notice."*
2. Click **Change and submit again**.
3. Change the last working day, the reason or the notice waiver, then click **Submit again**.

Both approvals **start again**. Earlier approvals do not count for the new submission.

You can also click **Withdraw** instead.

---

## 5. After It Is Accepted

- The employee's status becomes **Notice period**.
- On the employee's page (**HR → Employees** → the person), the **No-dues clearance** checklist lists what must be cleared before they leave.
- HR can see every resignation and its status under **All resignations** on **HR → Resignations**.

---

## 6. Resignation Statuses

| Status | Meaning |
|--------|---------|
| **Waiting for approval** | Submitted; waiting for the department manager and/or the department HR |
| **Sent back** | Returned to the employee with a note to change and submit again |
| **Accepted** | Both approved; notice period started |
| **Withdrawn** | The employee withdrew it |

---

## 7. Troubleshooting

**"I have the right, but the resignation is not in Waiting for your approval."**
You do not look after the employee's department. Ask HR to tick it for you in **HR → Settings → Resignations**.

**"The review says my HR role does not include the right."**
Your role does not have **Approve as department manager** or **Approve as department HR**. Ask an admin to add it in **HR → Settings → Access**.

**"The employee has no department, so only an organisation admin can approve it."**
Set the employee's department on their page in **HR → Employees**. Until then, only an organisation admin can approve.

**"I approved as manager. Why can't I approve as HR too?"**
One person approves only one step, so that two different people always agree.

**"I can't submit a resignation."**
- If **Submit resignation** is missing, you already have an open resignation. Change it or withdraw it under **My resignation**.
- If it is greyed out, you are already in your notice period or have left.
- If the page says *"No employment record is linked to your account"*, ask HR to link your login to your employee record.

**"Older resignations show Rejected."**
Resignations decided before this approval flow keep their old status. New ones are sent back instead of rejected.

**"Who can see all resignations?"**
People who can view HR employees, and organisation admins. Approvers who are not HR see only the resignations waiting for them.
