# Artium AI Engagement Guide

How Artium AI projects run, from inception through delivery. AI projects differ from traditional software projects due to their inherent unpredictability and the experimental nature of AI development. This guide covers our structured yet flexible approach.

## 1. Inception Phase

During inception, we:

- Collaboratively define project goals, scope, and success metrics, recognizing that AI projects evolve based on findings and experiments
- Use Miro boards to capture and prioritize experiments — AI initiatives rely heavily on testing and iterating to refine models, making this step crucial for establishing a clear experimental direction
- Validate data quality and availability early, as data is foundational to AI success — identify gaps, biases, or potential challenges to start with realistic expectations

## 2. Prototyping and Prompt Testing

Rapid prototyping is essential for validating AI concepts:

- Develop the fastest possible versions of AI features using tools like Jupyter Notebooks, chatbots, cloud AI services (AWS Bedrock, Google Vertex AI), and model APIs (Anthropic Claude, OpenAI). Test different configurations, refine prompts, and adapt based on early feedback.
- Conduct prompt testing with both internal teams and actual users to identify inconsistencies or misalignment in model outputs
- Iterate rapidly based on real-world feedback, continuously refining prompt structures, architecture, and data

## 3. Continuous Alignment Testing (CAT)

AI systems are non-deterministic — outputs can vary even with the same input. See [cat-framework.md](cat-framework.md) for full details.

Key points for engagement context:
- Design tests during development that mimic real-world user interactions
- Run tests repeatedly (20–100 times during development) to gather statistically significant performance data
- Use dialogue tests where one AI plays a user persona to simulate complex interactions
- Tests run across production data once the platform is live

## 4. Architectural Design

Choose the right AI architecture for the engagement. Common patterns:

- **Simple Chatbots** — straightforward conversational interfaces
- **AI-Assisted Systems** — AI aids specific tasks within a larger workflow
- **AI Flows** — output of one prompt feeds into the next, creating a chain of AI-driven processes
- **Full AI Applications** — AI is central to the application's functionality
- **Agentic Architectures** — multiple AI agents or sub-agents working collaboratively

These architectures can include LLMs, multimodal models, generative image/video/3D models, custom models, or other open-source ML models.

For software architecture, we:
- Select patterns and frameworks that allow rapid experimentation and adjustment
- Ensure scalability for increased data volumes or evolving AI capabilities
- Integrate feedback loops for ongoing testing and refinement

See [architecture.md](architecture.md) for detailed architecture patterns.

## 5. The AI Specialist Role

The AI Specialist supports the team without taking on technical leadership (held by AI Engineers):

- Ensures the project's AI objectives align with business goals
- Educates clients about AI capabilities and limitations
- Collaborates to refine and expand experiments from inception
- Ongoing collaboration on data structure, prompts, AI architecture, and new AI technologies

## 6. Data Considerations

- Ensure data is clean, relevant, and unbiased
- Verify legal rights to use the data (GDPR, HIPAA compliance, Artium SOC II procedures)
- Identify data gaps early and plan for additional collection or augmentation

## 7. Technical Environment Setup

- Set up coding, testing, and simulation environments using notebooks and cloud-based AI services
- Plan production infrastructure that can scale
- Develop user-facing simulations early for real-time feedback

## 8. Collaboration Practices

- Maintain balanced team dynamics — PMs, designers, AI engineers, and architects contributing equally
- Apply XP practices: pair programming, fast feedback, shared ownership
- Host regular workshops with clear outcomes

## 9. User Feedback Loop

User feedback is crucial because AI systems are non-deterministic and human behavior is unpredictable:

- Involve clients and end-users through workshops
- Use feedback to identify where the AI needs adjustments
- Maintain ethical practices: informed consent and data privacy

## 10. Risk Management and Compliance

- Identify potential risks early: data quality, model misalignment, compliance challenges
- Implement CAT to detect and address misalignments continuously
- Ensure compliance with regulations and industry standards

## Post-Inception Checklist

- [ ] Review inception meeting outcomes — client objectives, user personas, user journeys, prioritized features
- [ ] Identify potential experiments using Miro boards
- [ ] Understand constraints — technical, legal, business (especially data privacy and regulatory)
- [ ] Data assessment — verify availability, quality, and legal accessibility
- [ ] Determine team roles — establish whether an AI Architect is needed, define responsibilities
