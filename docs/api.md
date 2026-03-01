# API Documentation

Below is a summary of the backend endpoints exposed by the Second Brain application. Each route returns JSON with at least the following structure:

```json
{
  "success": true|false,
  "message": "informational text",
  "data": ...
}
```

## `/api/signup` (POST)

Registers a new user.

**Request body**:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "plaintext"
}
```

**Responses**:
- 201: `success: true` when user created
- 400/422: `success: false` for missing fields or existing email
- 500: server error

## `/api/auth/[...nextauth]` (POST automated by NextAuth)

Handles user sign-in using credentials, defined in `src/app/api/auth/[...nextauth]/route.ts`.

- Returns session/token cookies automatically.
- Adds `role` to JWT and session object.

## `/api/notes` (GET/POST)

### GET
Fetches all notes (or optionally filtered by title via query string). Requires an active session.

**Query params**:
- `title` (optional) — case-insensitive substring filter.

**Response data**: array of note objects.

### POST
Creates a new note with title, description, summary, and tags. Requires valid session.

**Request body**:
```json
{
  "title": "My note",
  "description": "Full content",
  "summary": "AI-generated summary",
  "tags": ["tag1","tag2"],
  "userId": "..." // optional server-side
}
```

## `/api/ai` (POST)

Calls the AI to analyze a piece of text and return a summary plus tags.

**Request body**:
```json
{
  "text": "The input text to analyze"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
     "summary": "...",
     "tags": ["..."]
  }
}
```

## `/api/chat` (POST)

Sends user question and notes context to the AI model for a conversational answer.

**Request body**:
```json
{
  "question": "What did I write about X?",
  "notes": [ {"title":"...","description":"..."}, ... ]
}
```

The endpoint streams the AI response back; for a plain implementation it returns the complete text in `data.result`.

---

All endpoints connect to the database at start and log errors to the console. Authentication is handled separately and not enforced within these routes, but client components check the session before calling protected APIs.
