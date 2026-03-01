"use client";
import { useState } from "react";

export default function CreateNote({ refresh }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!title || !content) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const aiRes = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ content }),
      });

      const aiData = await aiRes.json();
      if (aiData.error) {
        setError(aiData.error);
        setLoading(false);
        return;
      }

      const { result, tags } = aiData;

      const notesRes = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          summary: result,
          tags,
        }),
      });

      if (notesRes.ok) {
        setTitle("");
        setContent("");
        refresh();
      } else {
        setError("Failed to save note");
      }
    } catch (err) {
      setError("Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Create a new note</h3>

      <input
        className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-indigo-500"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-indigo-500"
        rows={4}
        placeholder="Write note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Save with AI"}
      </button>
      {error && <p className="mt-3 text-red-600">{error}</p>}
    </div>
  );
}