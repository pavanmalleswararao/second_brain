import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    try {
      const completion = await groq.chat.completions.create({
        model: "groq/compound-mini",
        messages: [
          {
            role: "system",
            content:
              "Summarize in 3 lines. Then provide tags separated by commas.",
          },
          { role: "user", content },
        ],
      });

      const result = completion.choices[0].message.content || "";

      const [summary, tagsLine] = result.split("Tags:");

      const tags = tagsLine
        ? tagsLine.split(",").map((t: string) => t.trim())
        : [];

      return Response.json({
        result: summary,
        summary,
        tags,
      });
    } catch (aiErr: any) {
      console.error("AI error:", aiErr);
      const message =
        aiErr?.error?.message || "Failed to process AI request";
      return Response.json({ error: message }, { status: 500 });
    }
  } catch (err) {
    console.error("ai error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}