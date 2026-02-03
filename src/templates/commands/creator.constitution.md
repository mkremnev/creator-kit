# Creator Constitution

Define your content creation principles and guidelines.

## Purpose

This command helps you establish your content creation constitution - the foundational principles, voice, and standards that guide all your content.

## Usage

Run `/creator.constitution` to create or update your content principles.

## What Gets Created

After running this command, you'll have a `constitution.md` file in `.contents/memory/` containing:

- **Voice & Tone**: Your unique writing style and personality
- **Content Principles**: Core values that guide your content
- **Quality Standards**: Criteria for evaluating your content
- **Target Audience**: Who you're creating for
- **Topics & Themes**: What you write about
- **Dos & Don'ts**: Specific guidelines to follow

## Instructions

When invoked, guide the user through defining their content constitution by asking about:

1. What is their content creation goal?
2. Who is their target audience?
3. What tone and voice should the content have?
4. What topics do they want to cover?
5. What makes their content unique?

Save the resulting constitution to `.contents/memory/constitution.md`.

## Example Output

```markdown
# Content Constitution

## Voice & Tone
- Professional but approachable
- Technical accuracy with accessible explanations
- Confident without being arrogant

## Core Principles
1. Always provide actionable value
2. Back claims with evidence
3. Respect the reader's time

## Target Audience
Software developers and tech leads interested in productivity and best practices.
```
