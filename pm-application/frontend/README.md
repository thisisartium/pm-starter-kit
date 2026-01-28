# Frontend

React application with Tailwind CSS, built with Vite.

## Structure

```
frontend/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── index.html            # HTML template
└── package.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will run on `http://localhost:3000` by default.

## Building

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Features

- React 18 with React Router
- Tailwind CSS for styling
- Vite for fast development and building
- ESLint for code quality

