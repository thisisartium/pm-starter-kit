# Continuous Alignment Testing (CAT)

CAT is Artium's testing framework for AI systems. Because AI outputs are non-deterministic — the same input can produce different outputs — traditional pass/fail testing isn't sufficient. CAT ensures AI systems remain reliable, accurate, and aligned with project goals over time.

## Why CAT exists

Traditional software tests verify deterministic behavior: given input X, expect output Y. AI systems don't work this way. A prompt that produces a great result 9 out of 10 times might hallucinate on the 10th. CAT addresses this by:

- Testing repeatedly to establish statistical confidence in AI behavior
- Monitoring alignment between AI outputs and intended outcomes
- Catching drift, degradation, and edge cases that single-run tests miss

## The four dimensions

CAT tests cover four areas:

### Security
Can the AI be manipulated into producing harmful, unauthorized, or data-leaking outputs?
- Prompt injection resistance
- Data exposure prevention
- Boundary enforcement

### Accuracy
Does the AI produce factually correct and relevant outputs?
- Factual correctness of responses
- Relevance to the input/context
- Hallucination detection

### Reliability
Does the AI produce consistent outputs across repeated runs?
- Output stability across multiple executions
- Performance under varying conditions
- Degradation detection over time

### Alignment
Do the AI's outputs match the intended purpose and tone?
- Adherence to specified guidelines and guardrails
- Tone and style consistency
- Behavior within defined boundaries

## How CAT works in practice

### During development

1. **Design tests** that mimic real-world user interactions
2. **Run each test 20–100 times** to gather statistically significant data on consistency and quality
3. **Use dialogue tests** where one AI plays a user persona to interact with the system's AI, simulating complex multi-turn interactions
4. **Define thresholds** — what percentage of passing results constitutes acceptable performance

### Writing a CAT test

For each test, define:

- **Type**: Security, accuracy, reliability, or alignment
- **Test mode**: Single-run or repeated
- **Test example**: The specific input/scenario
- **Desired output**: What a good result looks like
- **Failure definition**: What constitutes a failure (with examples)
- **Threshold of success**: For repeated tests, what pass rate is acceptable (e.g., 95%)

### In production

- Tests run continuously against production data
- Monitor for drift — AI behavior changing as models update or data shifts
- Alert on threshold violations
- Feed results back into prompt refinement

## CAT and the PM role

As a PM, you're responsible for:

- **Defining what "good" looks like** for AI features — this directly informs CAT test design
- **Setting thresholds** — what accuracy/reliability level can the business tolerate?
- **Writing acceptance criteria** that incorporate CAT — user stories for AI features should reference evaluation criteria
- **Pairing with engineers** during CAT test implementation to ensure shared context on what's being tested and why

## Relationship to user stories

When writing stories for AI features, acceptance criteria should reference CAT:

- What dimensions need testing (security, accuracy, reliability, alignment)?
- What are the success thresholds?
- What user scenarios need repeated testing?

Example AC addition:
> **Given** the AI generates a document summary
> **Then** the summary accurately reflects the source material in at least 95% of test runs (CAT reliability test)
