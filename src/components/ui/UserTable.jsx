export default function UserTable({ data, onEdit, onDelete }) {
    if (data.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500">
                No users found.
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">Username</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.map((user) => (
                        <tr
                            key={user._id}
                            className="hover:bg-slate-50 transition-colors"
                        >
                            <td className="px-6 py-4 font-medium text-slate-800">
                                {user.username}
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-1 rounded-sm text-xs font-semibold border ${
                                        user.role === "admin"
                                            ? "bg-purple-700 text-purple-50 border-purple-200"
                                            : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center space-x-3">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="text-slate-600 hover:text-slate-800 text-xs font-medium"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user._id)}
                                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
