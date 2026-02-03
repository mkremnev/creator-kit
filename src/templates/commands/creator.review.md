# Creator Review

Review and analyze your content for quality and consistency.

## Purpose

This command performs a comprehensive review of your content against your constitution and best practices.

## Usage

```
/creator.review
```

Run this after `/creator.write` and before publishing.

## What Gets Analyzed

- **Voice Consistency**: Does it match your constitution?
- **Message Clarity**: Is the key message clear?
- **Audience Fit**: Is it appropriate for the target audience?
- **Structure**: Does it flow logically?
- **Value**: Does it provide actionable insights?
- **CTA**: Is the call to action clear?
- **Platform Fit**: Does it meet platform requirements?

## Instructions

When invoked:

1. Load the written content draft
2. Load the constitution from `.contents/memory/constitution.md`
3. Load the original brief for comparison
4. Analyze against quality criteria
5. Generate a review report with:
   - Strengths
   - Areas for improvement
   - Specific suggestions
   - Overall score/assessment

## Review Report Format

```markdown
# Content Review

## Overall Assessment
[Strong/Good/Needs Work]

## Strengths
- Clear opening hook
- Good use of specific examples
- Strong call to action

## Areas for Improvement
- Second paragraph could be more concise
- Consider adding a question to boost engagement

## Suggestions
1. Tighten the middle section (current: 150 words, suggest: 100)
2. Add a specific metric in the results section
3. Consider ending with a question instead of statement

## Platform Check
- Character count: 1,847 / 3,000 ✓
- Hashtag count: 3 ✓
- CTA present: Yes ✓

## Constitution Alignment
- Voice: 9/10 - Matches professional but approachable tone
- Principles: 8/10 - Provides value, could use more evidence
```
