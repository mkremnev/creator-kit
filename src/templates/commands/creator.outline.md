# Creator Outline

Create a detailed content outline from your brief.

## Purpose

This command transforms a content brief into a structured outline that serves as the blueprint for writing.

## Usage

```
/creator.outline
```

Run this after `/creator.brief` and optionally `/creator.refine`.

## What Gets Created

A content outline document containing:

- **Structure**: Logical flow of sections
- **Key Points**: Main ideas per section
- **Hooks**: Opening lines or attention grabbers
- **Transitions**: How sections connect
- **Evidence Placeholders**: Where to add examples/data
- **Call to Action**: Closing and next steps

## Instructions

When invoked:

1. Read the content brief from the content directory
2. Read the constitution from `.contents/memory/constitution.md`
3. Generate an outline using `.contents/templates/workflow/content-plan-template.md`
4. Structure based on platform requirements (LinkedIn, Twitter, etc.)
5. Include estimated word/character counts if relevant
6. Save the outline to the content directory

## Platform-Specific Structures

### LinkedIn Post
- Hook (1-2 sentences)
- Setup (context)
- Key points (3-5 bullets or paragraphs)
- Proof/Example
- Call to Action

### Twitter Thread
- Hook tweet
- Numbered content tweets (3-10)
- Summary/recap tweet
- CTA tweet

### Telegram Post
- Headline/Hook
- Body content
- Key takeaways
- Engagement prompt

## Example Output

```markdown
# Outline: Better Code Reviews

## Hook
"The average code review wastes 30% of engineering time. Here's how we fixed it."

## Section 1: The Problem
- Common review bottlenecks
- Impact on team velocity

## Section 2: The Solution
- Async review practices
- Feedback frameworks

## Section 3: Results
- 40% time reduction
- Team satisfaction improvement

## CTA
"Try one technique this week. Reply with results."
```
