export default function NoteCard({ note }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-200">
      <h2 className="font-semibold text-lg text-gray-800">{note.title}</h2>

      <p className="text-gray-600 mt-2 mb-3 leading-relaxed">
        {note.summary}
      </p>

      <div className="flex flex-wrap gap-2">
        {note.tags?.map((tag: string, i: number) => (
          <span
            key={i}
            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}