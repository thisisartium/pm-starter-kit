Weekly Repo Summary is a hosted web app that connects to GitHub and generates a high-level
summary of last calendar week’s changes using OpenAI.

## Getting Started

1) Install dependencies:

```bash
npm install
```

2) Create a `.env.local` file based on `.env.example` and set:

- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional)

3) Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## GitHub OAuth setup

Create a GitHub OAuth App:

- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

For Fly.io, update those URLs to your deployed domain and set `NEXTAUTH_URL` accordingly.

## Fly.io deployment

1) Update `fly.toml` with your app name and region.
2) Set secrets:

```bash
fly secrets set NEXTAUTH_URL=https://your-app.fly.dev \
  NEXTAUTH_SECRET=... \
  GITHUB_ID=... \
  GITHUB_SECRET=... \
  OPENAI_API_KEY=... \
  OPENAI_MODEL=gpt-4o-mini
```

3) Deploy:

```bash
fly deploy
```

If you need Next.js reference docs, see https://nextjs.org/docs.
