# Creator Brief

Create a content brief from your idea.

## Purpose

This command transforms a content idea into a structured brief that guides the creation process.

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

1. Read the constitution from `.contents/memory/constitution.md` for context
2. Ask clarifying questions if the idea is vague
3. Generate a structured brief using the template from `.contents/templates/workflow/content-brief-template.md`
4. Save the brief to the appropriate content directory

## Template Reference

Use the template at `.contents/templates/workflow/content-brief-template.md` as the base structure.

## Example

Input: `/creator.brief "Tips for better code reviews"`

Output: A brief file with title, audience, key points, and platform specifications.
