# Creator Verify

Verify your content against a quality checklist.

## Purpose

This command runs a final verification checklist to ensure your content is ready for publishing.

## Usage

```
/creator.verify
```

Run this as the final step before publishing.

## What Gets Checked

- **Completeness**: All required elements present
- **Quality**: Meets minimum standards
- **Platform**: Fits platform requirements
- **Constitution**: Aligns with your principles
- **Technical**: No broken links, proper formatting

## Instructions

When invoked:

1. Load the content draft
2. Load or generate a checklist using `.contents/templates/workflow/content-checklist-template.md`
3. Run through each checklist item
4. Mark items as pass/fail
5. Generate a verification report
6. Highlight any blocking issues

## Default Checklist

```markdown
## Content Quality
- [ ] Has attention-grabbing hook
- [ ] Key message is clear in first 2 sentences
- [ ] Provides actionable value
- [ ] Examples/evidence support claims
- [ ] Call to action is specific

## Platform Requirements
- [ ] Within character/word limit
- [ ] Proper formatting for platform
- [ ] Hashtags (if applicable)
- [ ] Media prepared (if applicable)

## Constitution Alignment
- [ ] Matches defined voice and tone
- [ ] Follows content principles
- [ ] Appropriate for target audience

## Technical
- [ ] No spelling errors
- [ ] No broken links
- [ ] Proper punctuation
- [ ] Clean formatting

## Final
- [ ] Would you be proud to publish this?
- [ ] Does it represent your best work?
```

## Verification Report

```markdown
# Verification Report

## Status: READY TO PUBLISH ✓

## Results
✓ Content Quality: 5/5 passed
✓ Platform Requirements: 4/4 passed
✓ Constitution Alignment: 3/3 passed
✓ Technical: 4/4 passed
✓ Final: 2/2 passed

## Summary
All 18 checks passed. Content is ready for publishing.

## Next Steps
1. Copy content to platform
2. Add any final media
3. Schedule or publish
```
