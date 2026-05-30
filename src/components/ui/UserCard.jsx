import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

export default function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className="bg-white p-4 border border-slate-200 rounded-sm flex flex-col relative group hover:shadow-sm transition-shadow">
            <div className="absolute top-3 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(user)}
                    className="text-slate-400 hover:text-slate-800 cursor-pointer"
                >
                    <FaPenToSquare size={12} />
                </button>
                <button
                    onClick={() => onDelete(user._id)}
                    className="text-slate-400 hover:text-red-500 cursor-pointer"
                >
                    <FaTrashCan size={12} />
                </button>
            </div>

            <div className="flex items-center gap-3 mb-2 mt-1">
                <div className="w-9 h-9 bg-slate-800 rounded-sm text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                    {user.username.charAt(0)}
                </div>
                <div className="overflow-hidden pr-10">
                    <div className="font-bold text-slate-800 text-sm truncate">
                        {user.username}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                        {user.email}
                    </div>
                </div>
            </div>

            <span
                className={`self-start px-2 py-0.5 text-[9px] uppercase rounded-sm font-bold mt-1 ${
                    user.role === "admin"
                        ? "bg-slate-800 text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
            >
                {user.role}
            </span>
        </div>
    );
}
