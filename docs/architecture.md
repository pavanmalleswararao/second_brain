# Architecture

Second Brain is structured as a modern Next.js application using the **app router**. It leverages both server and client components alongside API routes to provide full-stack functionality.

## Core Layers

### 1. **Frontend (React + Tailwind CSS)**
- Pages and layouts live under `src/app/`. Components in `src/components/` are reused across pages.
- Uses `use client` directives for interactive components (forms, buttons, chat box).
- Styling is done with Tailwind CSS utility classes; animations use Framer Motion.
- Navigation state (logged in/out) is handled via `next-auth/react` providers.

### 2. **Authentication**
- NextAuth with credentials provider defined in `src/app/api/auth/[...nextauth]/route.ts`.
- Users are stored in MongoDB with hashed passwords using `bcryptjs`.
- JWT sessions include a `role` field for later admin logic.

### 3. **Database (MongoDB + Mongoose)**
- Connection logic consolidated in `src/lib/mongodb.ts` with connection caching for serverless.
- Two models: `User` and `Note` defined in `src/models/`.

### 4. **AI Integration**
- Replaced original OpenAI code with Groq SDK in `src/lib/groq.ts`.
- AI endpoints (`/api/ai`, `/api/chat`) transform inputs and manage errors.

### 5. **API Routes**
- CRUD operations and AI calls are implemented as Next.js API routes.
- Each route ensures the database is connected (`connectToDB()`), handles validation, and returns structured JSON with `success` flags and messages.

### 6. **State & Data Flow**
- Notes are fetched via client-side fetch in dashboard and stored in component state.
- Chat component sends question + notes list to `/api/chat` and displays streaming responses.

### 7. **Deployment Considerations**
- Environment variables configure database and AI provider keys.
- The app is serverless-compatible (Vercel or similar); database connection caching prevents excessive reconnects.

## Extensibility

- Add new AI models or providers by modifying `lib/groq.ts` or creating a new client file.
- Additional features (e.g., file attachments, collaborative editing) can be added by extending models and creating corresponding API routes.
