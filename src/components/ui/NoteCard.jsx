import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function NoteCard({ note, onEdit, onDelete, onToggleComplete }) {
    return (
        <div
            className={`p-5 rounded-sm border shadow-sm relative group flex flex-col transition-all ${
                note.isCompleted
                    ? "bg-slate-100 border-slate-200"
                    : "bg-white border-l-4 border-l-slate-800 border-y-slate-200 border-r-slate-200 hover:shadow-md"
            }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3
                    className={`text-base font-bold ${note.isCompleted ? "text-slate-400 line-through" : "text-slate-800"}`}
                >
                    {note.title}
                </h3>

                <input
                    type="checkbox"
                    checked={note.isCompleted}
                    onChange={() => onToggleComplete(note)}
                    className="w-4 h-4 mt-1 text-slate-800 bg-gray-100 border-gray-300 rounded cursor-pointer"
                />
            </div>

            <p
                className={`text-sm flex-1 whitespace-pre-wrap ${note.isCompleted ? "text-slate-400 line-through" : "text-slate-600"}`}
            >
                {note.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(note)}
                    className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
                    title="Edit Note"
                >
                    <FaPenToSquare />
                </button>
                <button
                    onClick={() => onDelete(note._id)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                    title="Delete Note"
                >
                    <FaTrashCan />
                </button>
            </div>
        </div>
    );
}
