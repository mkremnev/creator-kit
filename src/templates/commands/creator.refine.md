# Creator Refine

Deepen and polish your content brief through critical analysis.

## Purpose

This command performs a critical review of an existing brief and helps strengthen weak spots — vague messaging, thin evidence, unclear audience transformation, or missing emotional hooks. Unlike `/creator.brief` (which establishes the foundation), `/creator.refine` sharpens what's already there.

## Usage

```
/creator.refine
```

Run this after `/creator.brief` to improve the brief before outlining.

## How It Works

1. Reads the current content brief and the constitution
2. Scores each brief section for specificity and strength
3. Identifies the weakest areas (not all areas — only the ones that need work)
4. Asks up to 5 targeted deepening questions
5. Updates the brief with enriched content
6. Shows a before/after diff of what changed

## What It Analyzes

| Section | What "weak" looks like | What "strong" looks like |
|---------|----------------------|------------------------|
| Key Message | Generic, could apply to any post | Specific, opinionated, memorable |
| Audience | "developers" | "mid-level backend devs tired of slow PR cycles" |
| Unique Angle | Missing or generic | Rooted in personal experience or contrarian take |
| Evidence | No examples | Concrete data, stories, or quotes |
| Reader Transformation | Vague or missing | Clear before/after state |
| CTA | "let me know what you think" | Specific, actionable next step |

## Question Categories

Questions focus on **deepening**, not basic clarification:

- **Sharpness**: Can you make the key message more provocative or specific?
- **Tension**: What's the common belief you're challenging or nuance you're adding?
- **Proof**: What's the strongest piece of evidence you have? Can we lead with it?
- **Emotion**: What should the reader *feel* at the hook? At the end?
- **Transformation**: What does the reader believe before vs. after reading?

## Instructions

When invoked:

1. Load the most recent content brief from the content directory
2. Load the constitution from `.contents/memory/constitution.md`
3. Score each section: **strong** / **adequate** / **weak**
4. Select the 3-5 weakest areas
5. Generate targeted deepening questions for those areas only
6. **Wait for user responses**
7. Update the brief — rewrite weak sections using the user's answers
8. Show what changed: quote the old version and the new version for each updated section

## Example Session

```
Brief analysis:

  Key Message:    adequate — clear but generic
  Audience:       strong — well-defined in constitution
  Unique Angle:   weak — no personal perspective stated
  Evidence:       weak — no data or examples
  CTA:            adequate — present but vague

Questions for you:

Q1: Your key message is "code reviews can be faster."
    Can you make it more specific — what's the one thing teams get wrong?

Q2: What's your strongest proof point?
    A personal story, team metric, or before/after result?

Q3: Your CTA is "try this approach." What specific first step
    should the reader take this week?
```

After user responds:

```
Updated brief — changes:

Unique Angle:
  before: [empty]
  after:  "Most teams treat reviews as gatekeeping. We turned ours
           into async mentoring sessions — and shipped 40% faster."

Evidence:
  before: [empty]
  after:  "Team reduced avg review cycle from 2 days to 4 hours
           over 3 months. Developer satisfaction score went from 6.2 to 8.7."

CTA:
  before: "Try this approach"
  after:  "Pick one PR this week. Record a 2-min video walkthrough
           instead of writing comments. See what happens."
```
