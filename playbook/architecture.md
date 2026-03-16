# AI Architecture Patterns

AI architecture defines the structure, interaction, and flow of AI systems within an application. It determines how AI interacts with data, tools, and other agents — distinct from software architecture, which handles implementation details like technologies, frameworks, and platforms.

## AI Architecture vs. Software Architecture

- **Software architecture** manages the technology stack, infrastructure, and frameworks (the "how")
- **AI architecture** focuses on how AI components interact, adapt, and achieve project goals (the "what")

AI acts as an integrated user within the system or, in more complex cases, as a team of coordinated AI agents that communicate with each other and occasionally involve human input.

## Interaction Types and Patterns

### AI Assist
AI assists in tasks without dominating the interaction.

*Example: Summit Glass used LLMs to process documents, extracting and transforming data as needed without taking over the user experience.*

### Chat App
AI interacts through a conversational interface using LLMs.

*Example: Ticketmaster's chatbot used RAG with a single prompt to handle diverse queries, iterating on responses using code to refine and verify accuracy.*

*Example: Robin integrated a custom-trained image model (ResNet) into a chat app. ChatGPT generated 10,000 prompts for MidJourney to create training images representing various interior design styles, which fine-tuned a custom model for style identification.*

### AI Flow
A sequence of prompts where each step's output informs the next.

*Example: Arrive Health used a combination of LLMs, regex, and hybrid techniques to process information step-by-step. A verifier AI ensured the final output aligned with the original data, looping it back if discrepancies occurred.*

### AI App
AI acts as a co-creator, enabling collaboration with the user in multi-modal, multi-prompt workflows.

*Example: APEX offers a shared, interactive document where AI and the user collaborate to create content.*

### Agentic App
Multiple AI agents working together, often simulating a human team.

*Example: Mayo Clinic's system uses suites of agents to assist users through complex processes, managing context, memory, augmented generation, and workflows.*

### Cognitive System
A framework modeling human thinking and reasoning — perception, memory, learning, decision-making, and problem-solving. Applied in robotics and human-computer interaction for more human-like, adaptive AI systems.

## Advanced Techniques

### Model Chaining
Linking smaller models together to achieve outcomes a single model cannot handle effectively. Common in generating complex visual effects or handling nuanced tasks.

### Mixture of Experts
Specialized models or agents handle different parts of a task, ensuring more accurate and efficient outcomes. A scaled-up version of model chaining.

## Design Principles

### Scalability and Adaptability
Allow integration of new models, tools, and workflows without disrupting existing systems.

### Modularity and Flexibility
Build systems modularly so individual AI components can be adjusted or replaced, supporting rapid experimentation.

### Feedback and Learning Loops
Incorporate feedback mechanisms so AI systems learn, adapt, and maintain alignment with user needs and project objectives.

## Integration with Software Architecture

AI architecture operates on top of software architecture. Key integration points:

- **Context and Memory Management** — AI architecture determines how to manage conversation context (full history, summarized logs, short-term memory). Software architecture implements the storage and retrieval.
- **Custom Model Integration** — AI architecture guides which custom models to integrate. Software architecture handles how they interact with the broader system.
- **Tool Sharing** — In agentic systems, AI architecture defines how agents share tools and data. Software architecture handles access control and data flow.
- **Workflow Design** — AI architecture outlines multi-agent workflows. Software architecture implements communication and synchronization.

## Prompt Engineering Strategies

Key strategies to know as a PM:

1. **Direct Question** — Straightforward factual queries
2. **Instructional** — Specific task instructions
3. **Scenario-Based** — Hypothetical situations to explore
4. **Chain of Thought (COT)** — Step-by-step reasoning
5. **Chain Prompts** — Linked prompts building on each other
6. **Mixture of Experts** — Specialized prompts for different model experts
7. **Recursive** — Looping steps until a goal is reached
8. **Adversarial** — Challenging the AI to argue multiple positions
9. **Reflective Adversarial** — Simulated expert debates over multiple rounds

See [cat-framework.md](cat-framework.md) for how to test that these strategies are producing reliable results.
