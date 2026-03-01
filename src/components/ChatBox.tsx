"use client";
import { useState } from "react";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setAnswer("");
      } else {
        setAnswer(data.answer);
      }
    } catch (err) {
      setError("Failed to connect to server");
      setAnswer("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Chat with your notes</h3>
      <input
        className="w-full border p-3 mb-3 rounded-lg focus:outline-none focus:ring-indigo-500"
        placeholder="Ask something..."
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={ask}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
      >
        {loading ? "Asking..." : "Ask AI"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {answer && <p className="mt-4 leading-relaxed">{answer}</p>}
    </div>
  );
}