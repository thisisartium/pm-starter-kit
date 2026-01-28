# PM Application

A full-stack application with React frontend and Express backend, designed to connect with AI agents and GitHub.

## Project Structure

```
pm-application/
├── frontend/          # React application with Tailwind CSS
├── backend/           # Express API server
└── shared/            # Shared types and utilities (future)
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

Install all dependencies:

```bash
npm run install:all
```

### Development

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Frontend only (runs on http://localhost:3000)
npm run dev:frontend

# Backend only (runs on http://localhost:5000)
npm run dev:backend
```

### Building

Build both frontend and backend:

```bash
npm run build
```

## Architecture

- **Frontend**: React 18+ with Tailwind CSS, Vite for build tooling
- **Backend**: Express.js REST API server
- **Future**: AI agent integration and GitHub API connectivity

