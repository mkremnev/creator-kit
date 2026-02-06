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
4. Asks up to 5 targeted deepening questions via `AskUserQuestion` tool
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
5. Ask deepening questions via `AskUserQuestion` tool (see below)
6. **Wait for user responses**
7. Update the brief — rewrite weak sections using the user's answers
8. Show what changed: quote the old version and the new version for each updated section

### How to Use AskUserQuestion for Refine

Unlike `/creator.brief` (which has fixed question templates), refine questions are **dynamic** — they depend on the analysis results. Build questions based on what is weak.

**Key rules**:
- Group questions into a single `AskUserQuestion` call (up to 4 questions per call).
- Maximum 5 questions total. If more than 4 weaknesses found, use 2 calls.
- **multiSelect**: Always `false`.
- **Options**: Generate 2-4 concrete options based on the brief content. Each option should represent a distinct direction the user could take.
- **Headers**: Use the category name — "Sharpness", "Tension", "Proof", "Emotion", "Transform" (max 12 chars).
- When a question is about a specific brief section, quote the current weak text in the question so the user sees what they're improving.

**Generating options for deepening questions**:

For each weak section, generate options that represent **concrete rewrite directions**, not generic labels. Derive them from:
- The brief's topic and angle
- Common patterns for the content type
- The constitution's voice and audience

Example: if Key Message is weak and says "Code reviews are important":

```json
{
  "question": "Your key message is 'Code reviews are important.' Can we sharpen it?",
  "header": "Sharpness",
  "options": [
    {"label": "Speed angle", "description": "Most code reviews waste time — here's how to cut review cycles in half"},
    {"label": "Culture angle", "description": "Code reviews aren't about catching bugs, they're about building trust"},
    {"label": "Process angle", "description": "The #1 reason code reviews fail: no one agrees on what 'done' means"},
    {"label": "Results angle", "description": "We changed one thing about code reviews and shipped 40% faster"}
  ],
  "multiSelect": false
}
```

Example: if Evidence is weak (empty):

```json
{
  "question": "The brief has no supporting evidence yet. What's your strongest proof point?",
  "header": "Proof",
  "options": [
    {"label": "Team metrics", "description": "Share before/after numbers from your team"},
    {"label": "Specific story", "description": "A concrete situation where this approach worked"},
    {"label": "External data", "description": "Reference a study, survey, or industry benchmark"}
  ],
  "multiSelect": false
}
```

Example: if Reader Transformation is vague:

```json
{
  "question": "What should the reader believe differently after reading?",
  "header": "Transform",
  "options": [
    {"label": "Mindset shift", "description": "They rethink how they approach code reviews entirely"},
    {"label": "Quick win", "description": "They learn one technique they can apply immediately"},
    {"label": "Validation", "description": "They feel confirmed that their approach is right, plus get improvements"}
  ],
  "multiSelect": false
}
```

**Full call example** (3 weak areas found):

```json
{
  "questions": [
    {
      "question": "Your key message is 'Code reviews are important.' Can we sharpen it?",
      "header": "Sharpness",
      "options": [
        {"label": "Speed angle", "description": "Most code reviews waste time — here's how to cut review cycles in half"},
        {"label": "Culture angle", "description": "Code reviews aren't about catching bugs, they're about building trust"},
        {"label": "Process angle", "description": "The #1 reason code reviews fail: no one agrees on what 'done' means"}
      ],
      "multiSelect": false
    },
    {
      "question": "The brief has no supporting evidence yet. What's your strongest proof point?",
      "header": "Proof",
      "options": [
        {"label": "Team metrics", "description": "Share before/after numbers from your team"},
        {"label": "Specific story", "description": "A concrete situation where this approach worked"},
        {"label": "External data", "description": "Reference a study, survey, or industry benchmark"}
      ],
      "multiSelect": false
    },
    {
      "question": "Your CTA is 'try this approach.' What specific first step should the reader take?",
      "header": "CTA",
      "options": [
        {"label": "This week", "description": "Pick one PR and record a 2-min video walkthrough instead of writing comments"},
        {"label": "Today", "description": "Add a review checklist to your next PR template"},
        {"label": "Share back", "description": "Try the technique and reply with your results in the comments"}
      ],
      "multiSelect": false
    }
  ]
}
```

After all answers received, update the brief and show before/after for each changed section.
