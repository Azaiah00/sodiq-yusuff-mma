# GoHighLevel Form Routing Playbook

Every form on the site has a `TODO` comment pointing here. This document is the single source of truth for how each form should be wired up in GoHighLevel.

---

## 5 Automation Sequences You Must Build

| # | Sequence Name | Trigger Condition | Purpose |
|---|---------------|-------------------|---------|
| 1 | **Adult Prospect** | `Who is this for? = Myself` OR form on `adult-sales.html` | Nurture adults into their first class |
| 2 | **Kids Prospect 2–7** | `Program Interest = Parent & Me` OR `Little Ninjas` | Toddler/early-child focused parent messaging |
| 3 | **Kids Prospect 7–12** | `Program Interest = Juniors` | Confidence/bullying/discipline messaging |
| 4 | **Teen Prospect** | `Program Interest = Teens` | Identity, direction, peer-group messaging |
| 5 | **Fighter/Competitor** | Any form on `fighters.html` | Competition path, tryout-track messaging |

---

## Every Form on the Site (in page order)

### 1. `index.html` — Main Home Page Form
**Location:** bottom of page, `id="trial"` anchor
**Form purpose:** general trial capture

| Field | GHL Field | Notes |
|-------|-----------|-------|
| First Name | firstName | required |
| Last Name | lastName | required |
| Phone | phone | required |
| Email | email | required |
| Who is this for? | who_is_for | values: `Myself`, `My Child`, `Both` |
| Child's age | child_age | optional text |

**Routing logic:**
- If `who_is_for = Myself` → **Adult Prospect** sequence
- If `who_is_for = My Child` + `child_age ≤ 7` → **Kids Prospect 2–7**
- If `who_is_for = My Child` + `child_age 8–12` → **Kids Prospect 7–12**
- If `who_is_for = My Child` + `child_age 13–17` → **Teen Prospect**
- If `who_is_for = Both` → tag as **Adult Prospect** AND **Kids** (parallel)

**After submit:** redirect to `thank-you.html`

---

### 2. `programs.html` — Universal Program Form
**Location:** bottom of page, `id="trial"` anchor
**Form purpose:** program-specific trial

Same fields as above PLUS:
- `What are you most interested in?` → values: `Fitness` / `Self-Defense` / `Competition` / `My Child's Development` / `Not Sure Yet`

**Routing logic:** Same as #1, plus tag with the interest value for personalized nurture copy.

**After submit:** redirect to `thank-you.html`

---

### 3. `contact.html` — Full Contact Form
**Location:** `id="trial"` anchor
**Form purpose:** detailed contact capture — richest data

| Field | GHL Field | Notes |
|-------|-----------|-------|
| First/Last/Phone/Email | standard | all required |
| Who is this for? | who_is_for | Myself/My Child/Both |
| Child's age | child_age | optional |
| Program interest | program | Parent & Me / Little Ninjas / Juniors / Teens / Adults / Not Sure |
| Decision stage | stage | Ready / Jump into first class / Have questions / Just exploring |
| Free text | notes | optional |

**Routing logic:**
- Route by `program` field directly into the corresponding age-group sequence
- If `stage = I want to jump straight into my first class` → flag as **HOT LEAD**, notify via SMS/Slack immediately
- If `stage = Just exploring` → slower nurture cadence

**After submit:** redirect to `thank-you.html`

---

### 4. `adult-sales.html` — Form 1 (mid-letter)
**Location:** after "Who Is Teaching You" credentials block
**Form purpose:** early commit for adults who read enough

| Field | Notes |
|-------|-------|
| Name/Phone/Email | standard |
| Main goal | Get Fit / Self-Defense / Build Confidence / Competition / Community / All / Not Sure |
| Where are you? | Ready to start / Jump to first class / Have questions |

**Routing:** Always → **Adult Prospect** sequence. Tag by `goal` for personalized first email.

---

### 5. `adult-sales.html` — Form 2 (final close)
**Location:** bottom of page after "The Close" section
**Routing:** Same as Form 1 above. Use different tag (`adult-sales-final-close`) for attribution.

---

### 6. `kids-sales.html` — Form 1 (mid-letter)
**Location:** after "What Your Child Actually Develops" section
**Form purpose:** parents ready after reading about the Super Sodiq Training System

| Field | Notes |
|-------|-------|
| Parent name / phone / email | standard |
| Child's name | required |
| Child's age | required — DRIVES ROUTING |
| Program interest | Parent & Me / Little Ninjas / Juniors / Teens / Not Sure |
| Biggest goal | Confidence / Self-Defense / Discipline / Social / Physical / All |

**Routing:**
- Route by `program_interest` directly to corresponding sequence
- If `Not Sure` — fall back to age-based routing
- Tag by `biggest_goal` for nurture personalization

---

### 7. `kids-sales.html` — Form 2 (final close)
**Location:** bottom after "The Close" section
**Routing:** Same as kids Form 1 above. Different tag (`kids-sales-final-close`).

---

### 8. `fighters.html` — Form 1 (mid-page)
**Location:** after "The Invitation" section
**Form purpose:** serious competitor capture

| Field | Notes |
|-------|-------|
| Name/Phone/Email | standard |
| Competition goal | UFC / Local & Regional / Not sure at what level / Just know I want to fight |
| Experience | None / < 1 year / 1–3 years / 3+ years |
| Disciplines trained | free text |
| Notes | free text |

**Routing:** Always → **Fighter/Competitor** sequence.
- Sub-tag `goal_ufc` for UFC-goal leads (highest priority)
- Notify Sodiq personally for high-experience/UFC-goal leads

---

### 9. `fighters.html` — Form 2 (final close)
Same as Form 1. Different tag (`fighter-final-close`).

---

### 10. `media.html` — Media & Press Inquiries
**Location:** bottom of page
**Form purpose:** press/media only — separate from trial funnel

| Field | Notes |
|-------|-------|
| Name / Publication / Phone / Email | standard |
| Nature of request | free text |

**Routing:** → **Media Inquiry** sequence (separate from 5 prospect sequences).
- Send auto-confirmation: "Thanks, we'll respond within 24 hours"
- Internal notification to Sodiq + PR contact
- Do NOT redirect to `thank-you.html` — redirect to a simple media confirmation page

---

### 11. `blog.html` — Newsletter Signup (Super Squad Letter)
**Location:** bottom of page
**Form purpose:** newsletter subscribers only

| Field | Notes |
|-------|-------|
| First name | required |
| Email | required |

**Routing:** → **Super Squad Newsletter** list (separate from prospect sequences).
- Do NOT trigger trial-related automations
- Send welcome email with most recent 3 letters linked

---

## Thank You Page Calendar

`thank-you.html` has a `calendar-placeholder` div. Replace with GoHighLevel calendar embed:

```html
<iframe src="https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID"
  style="width:100%;border:none;min-height:700px;"
  scrolling="yes"></iframe>
```

**Pass lead context:** append `?contact_id={{contact.id}}&first_name={{contact.first_name}}` to prefill the calendar.

---

## Lead Magnet Delivery

### Adult: *The Mindset of a Champion* ebook
- Deliver via confirmation email automation (attach PDF)
- Trigger: Adult Prospect sequence start
- Subject line: "📖 Your Mindset of a Champion ebook — welcome to the Super Squad"

### Kids: *The Number One Secret to Increasing a Child's Confidence* video
- Deliver via confirmation email with embedded video link
- Trigger: Any kids sequence start
- Subject line: "🎥 The #1 secret to increasing your child's confidence — Sodiq's video for you"

---

## Priority Routing Tags (for GHL pipeline filters)

- `hot-lead` — any form where stage = "Ready to start" OR "Jump to first class"
- `goal-ufc` — fighter form with UFC goal
- `newsletter-only` — blog newsletter signups
- `press-only` — media form submissions
- `source-{page}` — record which page the form came from (e.g. `source-adult-sales`, `source-fighters`)

---

**Questions?** Ping Sodiq at 301-888-7285 before changing routing logic — every sequence was designed intentionally around the copy the visitor just read.
