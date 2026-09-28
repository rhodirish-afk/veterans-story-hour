# Booking system proposal (draft, not live)

Status: **live** (merged into `main`, 28 Sep 2026, with Rory's approval).

## The flow at a glance

1. **Form**: a school, pub or community group fills in `book.html`.
2. **Email to Rory**: FormSubmit emails the request, laid out as a table, to myone_ie@hotmail.co.uk. The sender gets an automatic acknowledgement (it confirms receipt only, with no promise of a date) and is taken to `thanks.html`.
3. **Log it**: Rory adds a row to the booking tracker (status `new`).
4. **Reply within 3 working days** with a proposed date and speakers (status `contacted` then `proposed`).
5. **Confirm**: once agreed, send the confirmation email (status `confirmed`).
6. **Reminder**: one week before, send the reminder email.
7. **Thanks and feedback**: within two days after, send thanks and a short feedback request (status `done`).

If a request can't go ahead, mark it `declined` in the tracker. Declined requests are **never** listed anywhere public.

## Before going live: FormSubmit activation (one-time)

FormSubmit won't deliver anything to a new address until that address has been activated. The **first** submission to `https://formsubmit.co/myone_ie@hotmail.co.uk` triggers an activation email to that inbox, and Rory has to click the link in it. Until he does, requests are not delivered.

- Suggested: after merging, Rory sends one test request himself, clicks the activation link (check Junk as well), then sends a second test to make sure the table email and the auto-acknowledgement both come through.
- If the address was already activated for the Deplorable Book Club form, activation may already be done. One test submission will show whether it is.
- Optional hardening: once activated, FormSubmit shows a random alias for the address. Swapping it into the form `action` keeps the email address out of the page source.
- Spam: FormSubmit's captcha is **on** (the default; there is no `_captcha=false` field), so senders see a short "I'm not a robot" step before being taken to the thanks page. A hidden `_honey` honeypot field catches bots as well.

## Hidden form settings

| Field | Value | Purpose |
|---|---|---|
| `_subject` | VSH booking request | Subject line of the email Rory receives |
| `_template` | table | Lays the email out as a tidy table |
| `_captcha` | (not set, so captcha is on) | FormSubmit shows its captcha step before delivering |
| `_next` | https://rhodirish-afk.github.io/veterans-story-hour/thanks.html | Confirmation page shown after sending |
| `_honey` | (empty, hidden) | Honeypot: bots fill it in and get dropped |
| `_autoresponse` | Acknowledgement text | Automatic reply to the sender, confirming receipt with no date promised |

## Tracker

`docs/booking-tracker.csv` has only the header row. Suggested use: import it into an Excel workbook or a Google Sheet (File > Import > Upload), then:

- Make **status** a drop-down (Data validation) with: `new`, `contacted`, `proposed`, `confirmed`, `done`, `declined`.
- Use **ref** in the format `VSH-2026-001`, and quote it in every email so threads are easy to match up.
- Keep **received** and **confirmed date** as real dates so you can sort and filter (for example, "confirmed, next 14 days" to find who needs a reminder).
- Keep the working copy **private**. It holds personal contact details and must not go on the public site or in the public repo. The CSV in the repo is only a blank template.
- Don't record speaker payments in any sheet that is shared.

Columns: ref, received, org type, org, contact, email, phone, preferred dates, format, audience, status, confirmed date, speakers, notes.

## Email templates

Placeholders are in `[SQUARE BRACKETS]`.

### 1. Proposed date (within 3 working days of the request)

> **Subject:** Veterans' Story Hour: proposed date for [ORGANISATION] ([REF])
>
> Dear [CONTACT NAME],
>
> Thank you for asking Veterans' Story Hour to visit [ORGANISATION]. It's good to hear from you.
>
> I'd like to propose **[DAY DATE] at [TIME]** for a [FORMAT] of about [45/60] minutes. We would bring [NUMBER] veteran speaker(s), each giving a short first-person account of their service, followed by questions from [AUDIENCE].
>
> For schools, there is no charge. The work is supported by a Civic Future Action Grant.
>
> To get ready, it would help to know:
> - the room and whether a microphone or projector is available
> - your visitor sign-in and safeguarding arrangements (our speakers are happy to follow them)
> - roughly how many will attend, and their year group or ages
>
> If the date doesn't suit, just reply with one or two alternatives and I'll do my best to fit around you.
>
> With thanks,
> Rory Hanrahan
> Veterans' Story Hour
> 07752 144777

### 2. Confirmation (once the date is agreed)

> **Subject:** Confirmed: Veterans' Story Hour at [ORGANISATION], [DATE] ([REF])
>
> Dear [CONTACT NAME],
>
> Thank you. I'm pleased to confirm:
>
> - **Date and time:** [DAY DATE], arriving [ARRIVAL TIME], starting [START TIME]
> - **Where:** [ADDRESS / ROOM]
> - **Format:** [FORMAT], about [DURATION]
> - **Speakers:** [FIRST NAMES / SERVICE, e.g. "Mark, former Royal Signals"]
> - **Audience:** [SIZE, YEAR GROUP]
> - **Your contact on the day:** [NAME, MOBILE]
>
> Our speakers will follow your sign-in and safeguarding procedures. If there's anything they should know beforehand, such as sensitivities in the group, accessibility needs or topics to avoid, please tell me and I'll brief them.
>
> I'll send a short reminder the week before. If anything changes, please call me on 07752 144777.
>
> With thanks,
> Rory Hanrahan
> Veterans' Story Hour

### 3. Reminder (one week before)

> **Subject:** Reminder: Veterans' Story Hour next [DAY], [DATE] ([REF])
>
> Dear [CONTACT NAME],
>
> A quick reminder that we're looking forward to visiting [ORGANISATION] on **[DAY DATE] at [TIME]**. [SPEAKERS] will arrive at about [ARRIVAL TIME] and report to [RECEPTION / CONTACT].
>
> Could you confirm that the room, timings and your contact on the day are still as planned? If there have been any changes to numbers or arrangements, just reply to this email.
>
> With thanks,
> Rory Hanrahan
> 07752 144777

### 4. Thanks and feedback (within two days after)

> **Subject:** Thank you from Veterans' Story Hour ([REF])
>
> Dear [CONTACT NAME],
>
> Thank you for welcoming us to [ORGANISATION] on [DATE]. Our speakers really valued the chance to share their stories and hear the questions.
>
> If you have a couple of minutes, I'd be grateful for a few lines of feedback:
> 1. What worked well?
> 2. What could we do better?
> 3. Would you welcome us back, or recommend us to another school or group?
> 4. May we quote your feedback (anonymously, or with your name and organisation) on our website?
>
> Thank you again for helping us keep these stories alive.
>
> With best wishes,
> Rory Hanrahan
> Veterans' Story Hour

## Decisions for Rory before merging

- [ ] Reply target: 3 working days is suggested. Change it if you'd like a different promise.
- [ ] Activate FormSubmit (see above) straight after merging.
- [x] `book.html` added to `sitemap.xml` at go-live.
- [ ] Set up the private tracker sheet from the CSV.
