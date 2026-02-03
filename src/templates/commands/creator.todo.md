# Creator Todo

Generate a task list from your content outline.

## Purpose

This command creates an actionable task list from your content outline, breaking down the writing process into manageable steps.

## Usage

```
/creator.todo
```

Run this after `/creator.outline`.

## What Gets Created

A task list document containing:

- **Research Tasks**: Information to gather
- **Writing Tasks**: Sections to draft
- **Enhancement Tasks**: Elements to add (examples, data)
- **Review Tasks**: Quality checks to perform
- **Publishing Tasks**: Platform-specific preparations

## Instructions

When invoked:

1. Read the content outline from the content directory
2. Generate tasks using `.contents/templates/workflow/content-tasks-template.md`
3. Order tasks by dependency and priority
4. Include estimated effort where relevant
5. Save the task list to the content directory

## Task Format

```markdown
- [ ] Task description
  - Context or details
  - Acceptance criteria
```

## Example Output

```markdown
# Tasks: Better Code Reviews

## Research
- [ ] Find statistics on code review time
- [ ] Gather team metrics from last quarter

## Writing
- [ ] Draft hook opening
- [ ] Write problem section with examples
- [ ] Write solution section with techniques
- [ ] Draft call to action

## Enhancement
- [ ] Add specific code examples
- [ ] Include team testimonial

## Review
- [ ] Check against constitution principles
- [ ] Verify character count for platform
- [ ] Proofread for typos

## Publish
- [ ] Format for LinkedIn
- [ ] Prepare hashtags
- [ ] Schedule posting time
```
