# Second Brain

Second Brain is a Next.js application that provides an AI-powered note-taking and knowledge management platform. It allows users to sign up/sign in, create notes augmented with AI-generated summaries and tags, and chat with their accumulated notes.

The project is inspired by a reference demo site and contains the following core functionality:

- User authentication with NextAuth credentials provider
- MongoDB persistence for notes and users
- Automatic AI summaries and tag extraction using an LLM (configured via Groq SDK)
- A chat interface to query your notes using the AI model
- Responsive, modern UI built with Tailwind CSS and Framer Motion

## Features

- **Create Note**: Write a note and the app uses AI to summarize content and suggest tags.
- **Search**: Filter notes by title.
- **Chat with Notes**: Ask questions about your stored notes; the AI answers using only your notes' content.
- **Authentication**: Protected dashboard and admin panel; JWT sessions with role support.
- **User Interface**: Professional-looking layout with navbar, cards, and forms.

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB (Atlas or local)
- API key for Groq (or another LLM provider)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url> second-brain
   cd second-brain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/second-brain
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=http://localhost:3000
   GROQ_API_KEY=your_groq_key
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
second-brain/
├─ src/
│  ├─ app/              # Next.js app directory (pages, layouts)
│  ├─ components/       # Reusable React components
│  ├─ lib/              # Helper modules (mongodb, groq)
│  ├─ models/           # Mongoose schemas
│  ├─ types/            # Type declarations
│  └─ ...
├─ public/              # Static assets
├─ package.json
├─ tsconfig.json
└─ README.md
```

### API Routes

- `POST /api/signup` – register new user (hashes password)
- `POST /api/auth/[...nextauth]` – NextAuth credentials provider
- `GET/POST /api/notes` – list and add notes
- `POST /api/ai` – call LLM to summarize content and return tags
- `POST /api/chat` – send question & notes context to LLM and return answer

All routes perform a MongoDB connection check and error handling.

## Environment Variables

| Name            | Description                           |
|-----------------|---------------------------------------|
| MONGODB_URI     | MongoDB connection string             |
| NEXTAUTH_SECRET | Secret for NextAuth JWT sessions      |
| NEXTAUTH_URL    | Base URL of the application           |
| GROQ_API_KEY    | API key for Groq LLM provider         |

## Extending the App

- **Changing AI provider**: swap `lib/groq.ts` and update routes with a different SDK (OpenAI, HuggingFace, etc.).
- **Additional fields**: modify `Note` schema and update forms accordingly.
- **Admin features**: the `/admin` page is protected and can be expanded for user management.

## Deployment

The app can be deployed on platforms that support Next.js (Vercel, Netlify, etc.). Ensure environment variables are set in the deployment settings and the MongoDB URI is accessible.

## Contributing

Feel free to fork and submit pull requests. Maintain consistent code style and include tests for new features where appropriate.

## License

This project is provided under the MIT license unless otherwise specified.

