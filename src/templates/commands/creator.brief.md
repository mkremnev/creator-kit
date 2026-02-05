# Creator Brief

Create a content brief from your idea.

## Purpose

This command transforms a content idea into a structured brief that guides the creation process. It asks targeted clarifying questions to ensure the brief is specific and actionable from the start.

## Usage

```
/creator.brief "Your content idea here"
/creator.brief "LinkedIn post about AI productivity tools"
```

## What Gets Created

A content brief document in your content directory containing:

- **Working Title**: Tentative name for the content
- **Content Type**: Format (post, thread, article)
- **Target Platform**: Where it will be published
- **Key Message**: The core point to convey
- **Target Audience**: Who will read this
- **Goals**: What you want to achieve
- **Key Points**: Main topics to cover
- **Call to Action**: What readers should do next

## Instructions

When invoked with a content idea:

1. **Read context**: Load the constitution from `.contents/memory/constitution.md`
2. **Parse the idea**: Extract what is already known from the user's input — platform, topic, audience, angle, etc.
3. **Cross-reference with constitution**: Check which brief template fields are already covered by constitution data (audience, voice, topics). Do not ask about what is already defined there.
4. **Identify gaps**: Map known information against the brief template fields. Determine which critical fields are still missing.
5. **Ask clarifying questions** (see Clarifying Questions below): Ask **3-5 questions** based on what is missing. Always wait for the user to respond before proceeding.
6. **Generate the brief**: Fill the template from `.contents/templates/workflow/content-brief-template.md` using: user input + constitution data + user's answers to questions.
7. **Save** the brief to the appropriate content directory.

### Clarifying Questions

Questions are split into two tiers. Ask always-ask questions first, then fill remaining slots (up to 5 total) with conditional questions.

**Always ask** (unless the answer is explicit in the user's input):

| Priority | Field | Example Question |
|----------|-------|------------------|
| 1 | Platform | Where will this be published — LinkedIn, Twitter/X, Telegram, blog? |
| 2 | Unique Angle | What from your personal experience or perspective makes this take different? |
| 3 | Call to Action | What should the reader do after reading — comment, try something, follow a link? |

**Ask if missing** (not covered by user input or constitution):

| Priority | Field | Example Question |
|----------|-------|------------------|
| 4 | Target Audience | Who is the ideal reader for this piece? (skip if defined in constitution) |
| 5 | Supporting Evidence | Do you have data, examples, or personal stories to back this up? |
| 6 | Goals / Success Metrics | What matters most — engagement, reach, authority, conversions? |
| 7 | Scope | Should we keep this narrow and deep, or broad and introductory? |

**Rules**:
- Maximum 5 questions total per session.
- If constitution already defines a field (e.g., target audience), skip that question and use the constitution value.
- Present all questions at once, numbered Q1-Q5.
- **Wait for the user to answer before generating the brief.**
- If the user's input already covers an always-ask field explicitly (e.g., `/creator.brief "LinkedIn post about..."`), skip that question.

## Template Reference

Use the template at `.contents/templates/workflow/content-brief-template.md` as the base structure.

## Example

Input: `/creator.brief "Tips for better code reviews"`

Agent asks:
```
Before I create the brief, a few questions:

Q1: Where will this be published — LinkedIn, Twitter/X, Telegram, blog?
Q2: What from your experience makes your take on code reviews different?
Q3: What should readers do after reading — try a technique, comment, share?
Q4: Do you have specific data or examples (team metrics, before/after)?
Q5: Narrow focus (e.g., just async reviews) or broad overview of practices?
```

User answers, then the agent generates a complete brief.
