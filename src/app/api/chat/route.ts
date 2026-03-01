import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { question } = await req.json();
    const notes = await Note.find();

    const context = notes.map((n) => n.content).join("\n");

    try {
      const completion = await groq.chat.completions.create({
        model: "groq/compound-mini",
        messages: [
          { role: "system", content: "Answer only using provided notes." },
          {
            role: "user",
            content: `Notes:\n${context}\n\nQuestion:\n${question}`,
          },
        ],
      });

      return Response.json({
        answer: completion.choices[0].message.content,
      });
    } catch (aiErr: any) {
      console.error("AI error:", aiErr);
      const message =
        aiErr?.error?.message || "Failed to process AI request";
      return Response.json({ error: message }, { status: 500 });
    }
  } catch (err) {
    console.error("chat error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}