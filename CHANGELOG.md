# Release 1.0.2

Add humanizer skill and command templates with scaffolding and tests

- Add .claude/skills/humanizer/ directory and SKILL.md template
- Add creator.humanizer.md command template
- Update init and update commands to deploy skill files
- Add tests verifying creation and restoration of humanizer skill and command files
- Update mappings and directory config for skill support
- Add CHANGELOG entries describing brief and refine enhancements

# Release 1.0.3
### creator.brief.md

- Instructions: Instead of a single line "ask if vague," a full 7-step flow with an explicit pause for the user's response has been added.
- Clarifying Questions: A section with two levels of questions has been added:
- Always-ask (platform, unique angle, CTA) -- always asked if not obvious from the input.
- Ask-if-missing (audience, evidence, goals, scope) -- asked if not covered by the constitution.
- Constitution-awareness: Step 3 explicitly requires not duplicating what is already in the constitution.
- Rules: Max 5 questions, all at once, wait for a response, skip if the answer is already in the input.
- Example: Shows a real dialogue: agent -> questions -> user answers -> brief.

### creator.refine.md

Reworked from a "repeat brief" into a deepening tool:

- Scoring: The agent evaluates each section as strong / adequate / weak.
- Question Categories: Instead of basic (scope, angle, evidence) -- Deepening questions: sharpness, tension, proof, emotion, transformation
- Analysis table: describes what is considered "weak" and "strong" for each section
- Before/after diff: the agent shows what exactly was changed and how it was before
- Clear separation: brief establishes the foundation, refine sharpens weak points

Now brief and refine do not overlap, but work as two sequential stages: foundation -> sharpening.
