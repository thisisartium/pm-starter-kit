# Backend API

Express.js REST API server for the PM Application.

## Structure

```
backend/
├── src/
│   ├── server.js           # Entry point
│   ├── routes/             # Route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── middleware/         # Custom middleware
│   └── utils/              # Utility functions
├── .env.example            # Environment variables template
└── package.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Routes
- `GET /api` - API information

### Agents
- `POST /api/agents/prompt` - Send a prompt to OpenAI LLM
  - Body: `{ prompt: string, repoId?: string }`

### Repositories
- `GET /api/repos` - Get all connected repositories
- `POST /api/repos` - Add a new repository
  - Body: `{ owner: string, name: string, url?: string }`
- `DELETE /api/repos/:id` - Remove a repository

## Environment Variables

Create a `.env` file in the backend directory with:

```
PORT=5000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo  # Optional, defaults to gpt-3.5-turbo
```

