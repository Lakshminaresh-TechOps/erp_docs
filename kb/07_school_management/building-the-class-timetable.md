---
title: "Building the Class Timetable"
description: "How to fill a class timetable by clicking a period, why only free teachers are offered, and how to auto-fill empty periods with chosen subjects and teachers."
author: "VAP ERP Team"
publishedAt: "2026-11-01"
updatedAt: "2026-11-01"
status: "published"
category: "School Management"
module: "school"
audience: "school_admin"
tags: ["School", "Timetable", "Periods", "Auto-fill", "Teachers"]
---

# Building the Class Timetable

The **Timetable** page has two tabs: **Class timetable**, where you plan a class week by week, and **Teacher timetable**, which shows one teacher's week. The grid uses the school day from **Settings**, so set that up first.

---

## How do I plan one period?

1. Open **Timetable** and stay on **Class timetable**.
2. Choose the class at the top. If the class has sections, a section is chosen too.
3. Click a period in the grid. An editor opens right under that period.
4. Pick the **Subject**.
5. Pick the **Teacher**. The teacher set for that subject in **Academics** is filled in for you when they are free.
6. Save. To use the same subject and teacher in this period on every school day, choose the every-day option before saving.

To empty a period, open it and click **Clear this period**.

---

## Why are only some teachers shown?

The teacher list shows teachers who are free in that period. Teachers already teaching another class then appear on a line that starts with **Busy then**, for example "Busy then: Mr Rao (5 B)". This avoids double booking.

If the teacher you want is busy, the editor says so in words, such as "A teacher already teaches 5 B in period 1 on Monday". Choose another free teacher, or open the other class's period and change it.

Teachers are first taken from those marked for the subject. Click **Show free teachers of other subjects too** to see everyone who is free.

---

## How do I copy a day to the other days?

Once a day is planned, use **Copy Monday to the other days** (or the button for the day you planned). Each period is copied to the other school days that have the same period, and it replaces what was planned in that period on those days. A period is left out, and listed in the message, when its teacher is already teaching another class at that time.

---

## How does auto-fill work?

Auto-fill plans the empty periods of a class for you. It never moves a period that is already planned.

1. Click **Auto-fill the empty periods**.
2. Under **Choose the subjects to plan, and their periods a week**, tick the subjects to plan. A class with subjects set in Academics starts with them ticked. A class without any shows the subjects of its stage, unticked, so a Class 6 is not offered intermediate subjects. Use **Tick all** or **Untick all**.
3. For each ticked subject enter the number of periods a week. The number saved in Academics is used when there is one.
4. For each ticked subject choose the teacher, or leave it on **Automatic**:
   - Automatic uses the teacher set in Academics for that subject.
   - If none is set, the teachers marked for the subject share the periods, and the teacher with the fewest periods gets the next one.
   - A teacher you choose is the only teacher used for that subject.
5. Click **Preview**. You see how many periods can be planned, which subjects could not get all their periods, and how many periods each teacher takes in each subject.
6. Click **Plan these N periods** to save them. Click **Discard** to leave without saving.

Auto-fill spreads a subject across the week, aiming for one period a day first and not always in the same period. Nobody is given two classes in the same period.

---

## Can auto-fill remember the teachers?

After a preview, if one teacher takes every period of a subject and is not yet the subject teacher in Academics, a tick box appears: make this teacher the subject teacher of the class in Academics so the next plan starts from them. It is off by default. Tick it only when you want the change.

The periods a week you typed are also saved for the class, so they are ready next time.

---

## What if auto-fill could not place everything?

The preview says which subject is short and how many periods are missing. The usual reasons are no free period left in the week, or the chosen teacher being busy. Change the number of periods, pick another teacher, or place the rest by hand.

---

## Who can change the timetable?

The school's administrator plans the timetable. Other staff view it, and each teacher can look at their own week under **Teacher timetable**.
