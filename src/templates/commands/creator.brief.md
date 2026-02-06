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
5. **Ask clarifying questions via AskUserQuestion tool** (see Clarifying Questions below): Build 1-2 calls based on what is missing. Always wait for all answers before proceeding.
6. **Generate the brief**: Fill the template from `.contents/templates/workflow/content-brief-template.md` using: user input + constitution data + user's answers to questions.
7. **Save** the brief to the appropriate content directory.

### Clarifying Questions

Questions are split into two tiers. Always-ask questions go in the first `AskUserQuestion` call, conditional questions go in the second call (if needed).

**Always ask** (unless the answer is explicit in the user's input):

| Priority | Field | Header | Question | Options |
|----------|-------|--------|----------|---------|
| 1 | Platform | Platform | Where will this be published? (multiSelect: true) | LinkedIn / Twitter/X / Telegram / Blog |
| 2 | Unique Angle | Angle | What makes your perspective on this topic different? (multiSelect: true) | Personal experience / Contrarian take / Data & research / Industry insight |
| 3 | Call to Action | CTA | What should the reader do after reading? (multiSelect: true) | Comment & engage / Try a technique / Follow a link / Share with others |

**Ask if missing** (not covered by user input or constitution):

| Priority | Field | Header | Question | Options |
|----------|-------|--------|----------|---------|
| 4 | Target Audience | Audience | Who is the ideal reader? | Junior devs / Mid-level engineers / Tech leads / Non-technical managers |
| 5 | Supporting Evidence | Evidence | What proof will you use? | Personal metrics / Personal story / Industry research / No evidence yet |
| 6 | Goals | Goal | What matters most for this post? | Engagement / Reach / Authority / Conversions |
| 7 | Scope | Scope | How deep should this go? | Narrow & deep / Broad & introductory / Balanced overview |

> **Note on options**: The table above shows default options. Adapt them to the specific content idea when it makes sense (e.g., for a post about cooking, "Junior devs" is not a valid audience option). The user can always select "Other" to provide a custom answer.

### How to Use AskUserQuestion

Build the tool call using the tables above. Key rules:

- **First call**: Include all applicable always-ask questions (up to 3). Skip any whose answer is already explicit in the user's input.
- **Second call** (only if needed): Include applicable conditional questions (up to 2). Skip any covered by constitution.
- **Maximum**: 5 questions total across both calls.
- **multiSelect**: `true` for all questions (content can target multiple platforms).
- **Options**: Use 2-4 options from the table. Each option needs a `label` (short) and `description` (1 sentence explaining what this means for the content).
- **"Other"**: The tool automatically adds an "Other" option — do not add it manually.
- **Wait**: Do not generate the brief until all `AskUserQuestion` calls are answered.

Example tool call for `/creator.brief "Tips for better code reviews"`:

```json
{
  "questions": [
    {
      "question": "Where will this be published?",
      "header": "Platform",
      "options": [
        {"label": "LinkedIn", "description": "Professional long-form post up to 3000 characters"},
        {"label": "Twitter/X", "description": "Thread format, 280 chars per tweet"},
        {"label": "Telegram", "description": "Channel post up to 4096 characters"},
        {"label": "Blog", "description": "Full article, no character limits"}
      ],
      "multiSelect": true
    },
    {
      "question": "What makes your take on code reviews different?",
      "header": "Angle",
      "options": [
        {"label": "Personal experience", "description": "Based on what worked in your team"},
        {"label": "Contrarian take", "description": "Challenging a common belief about reviews"},
        {"label": "Data & research", "description": "Backed by metrics or studies"},
        {"label": "Industry insight", "description": "Patterns observed across companies"}
      ],
      "multiSelect": true
    },
    {
      "question": "What should readers do after reading?",
      "header": "CTA",
      "options": [
        {"label": "Try a technique", "description": "Apply one specific practice this week"},
        {"label": "Comment & engage", "description": "Share their own review experience"},
        {"label": "Share the post", "description": "Spread it to their network"},
        {"label": "Follow a link", "description": "Visit a resource or tool"}
      ],
      "multiSelect": true
    }
  ]
}
```

Then, if evidence and scope are not covered:

```json
{
  "questions": [
    {
      "question": "Do you have data or examples to back this up?",
      "header": "Evidence",
      "options": [
        {"label": "Team metrics", "description": "Before/after data from your team"},
        {"label": "Personal story", "description": "A specific situation that illustrates the point"},
        {"label": "Industry research", "description": "Published studies or benchmarks"},
        {"label": "Not yet", "description": "Will figure out proof points later"}
      ],
      "multiSelect": true
    },
    {
      "question": "How deep should this post go?",
      "header": "Scope",
      "options": [
        {"label": "Narrow & deep", "description": "One specific aspect of code reviews in detail"},
        {"label": "Broad overview", "description": "Cover multiple practices at a high level"},
        {"label": "Balanced", "description": "2-3 practices with moderate depth"}
      ],
      "multiSelect": false
    }
  ]
}
```

## Template Reference

Use the template at `.contents/templates/workflow/content-brief-template.md` as the base structure.
