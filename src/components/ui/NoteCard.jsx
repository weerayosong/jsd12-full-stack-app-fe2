import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function NoteCard({ note, onEdit, onDelete, onToggleComplete }) {
    return (
        <div
            className={`p-4 rounded-sm border shadow-sm relative group flex flex-col transition-all ${
                note.isCompleted
                    ? "bg-slate-50 border-slate-200 opacity-80"
                    : "bg-white border-l-4 border-l-slate-800 border-y-slate-200 border-r-slate-200 hover:shadow-md"
            }`}
        >
            <div className="flex justify-between items-start mb-1.5">
                <h3
                    className={`text-sm font-bold ${note.isCompleted ? "text-slate-400 line-through" : "text-slate-800"}`}
                >
                    {note.title}
                </h3>

                <input
                    type="checkbox"
                    checked={note.isCompleted}
                    onChange={() => onToggleComplete(note)}
                    className="w-3.5 h-3.5 mt-0.5 accent-slate-800 cursor-pointer shrink-0"
                />
            </div>

            <p
                className={`text-xs flex-1 whitespace-pre-wrap ${note.isCompleted ? "text-slate-400 line-through" : "text-slate-500"}`}
            >
                {note.content}
            </p>

            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(note)}
                    className="text-slate-400 hover:text-slate-800 cursor-pointer transition-colors"
                    title="Edit Note"
                >
                    <FaPenToSquare size={12} />
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    title="Delete Note"
                >
                    <FaTrashCan size={12} />
                </button>
            </div>
        </div>
    );
}
