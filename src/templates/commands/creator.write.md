# Creator Write

Write the content following your outline and tasks.

## Purpose

This command generates the actual content based on your brief, outline, and task list.

## Usage

```
/creator.write
```

Run this after completing the planning phase (`/creator.brief`, `/creator.outline`, `/creator.todo`).

## How It Works

1. Reads all planning documents (brief, outline, tasks)
2. Reads constitution for voice and style
3. Generates content section by section
4. Follows platform-specific formatting
5. Applies quality standards

## Instructions

When invoked:

1. Load the content brief, outline, and task list
2. Load the constitution from `.contents/memory/constitution.md`
3. Select appropriate content template from `.contents/templates/content/`
4. Write content following the outline structure
5. Apply voice and tone from constitution
6. Format for the target platform
7. Save the draft to the content directory

## Content Templates Available

- `.contents/templates/content/linkedin-post-template.md`
- `.contents/templates/content/telegram-post-template.md`
- `.contents/templates/content/twitter-thread-template.md`

## Quality Checklist During Writing

- [ ] Follows constitution voice and tone
- [ ] Addresses target audience
- [ ] Includes hook/opening
- [ ] Provides value (actionable insights)
- [ ] Has clear call to action
- [ ] Meets platform constraints (length, format)

## Example Output

For a LinkedIn post, the output might be:

```markdown
The average code review wastes 30% of engineering time.

Here's how we cut that in half:

1. Async-first reviews
Instead of blocking sync meetings, we moved to async reviews with video walkthroughs.

2. Structured feedback
We use a simple framework: What works, what could improve, questions.

3. Time-boxed responses
Every review gets a response within 4 hours, even if it's "looking at this tomorrow."

Results after 3 months:
→ 40% faster review cycles
→ 25% fewer back-and-forth comments
→ Higher team satisfaction scores

Which technique will you try first?

#engineering #codereview #productivity
```
