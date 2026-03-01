import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return Response.json(notes);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const note = await Note.create(body);
  return Response.json(note);
}