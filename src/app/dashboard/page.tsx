"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import CreateNote from "@/components/CreateNote";
import NoteCard from "@/components/NoteCard";
import ChatBox from "@/components/ChatBox";

export default function Dashboard() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note: any) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex items-center justify-between mb-8">
          {/* heading removed */}
          {session && (
            <div className="flex items-center space-x-4">
              {/* email no longer shown here */}
            </div>
          )}
        </div>

        <input
          placeholder="Search notes..."
          className="w-full p-3 rounded-lg border mb-6 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => setSearch(e.target.value)}
        />

        <CreateNote refresh={fetchNotes} />

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filteredNotes.map((note: any) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>

        <ChatBox />
      </div>
    </div>
  );
}