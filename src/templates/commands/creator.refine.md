# Creator Refine

Refine and clarify your content brief through targeted questions.

## Purpose

This command helps improve and clarify an existing content brief by asking targeted questions and incorporating the answers.

## Usage

```
/creator.refine
```

Run this after `/creator.brief` to improve the brief before outlining.

## How It Works

1. Reads the current content brief
2. Identifies areas that need clarification
3. Asks up to 5 targeted questions
4. Updates the brief with your answers

## Questions May Include

- **Scope**: Is the topic too broad or narrow?
- **Angle**: What unique perspective are you bringing?
- **Evidence**: What examples or data will you use?
- **Audience**: Are there specific pain points to address?
- **Outcome**: What should readers feel or do after reading?

## Instructions

When invoked:

1. Find the most recent content brief in the content directory
2. Analyze for underspecified areas
3. Generate 3-5 clarifying questions
4. Wait for user responses
5. Update the brief with new information
6. Highlight what was added or changed

## Example Session

```
Q1: What specific code review practices do you want to highlight?
A: Focus on async reviews and providing constructive feedback

Q2: Do you have personal examples or data to share?
A: Yes, our team reduced review time by 40%

[Brief updated with these details]
```
