import { useState } from "react";

export default function UserForm({ onSubmit, onCancel, initialData = null }) {
    const [formData, setFormData] = useState({
        username: initialData?.username || "",
        email: initialData?.email || "",
        role: initialData?.role || "user",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { ...formData };

        if (initialData && !payload.password) {
            delete payload.password;
        }

        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm mb-6"
        >
            <h2 className="text-lg font-bold text-slate-800 mb-4">
                {initialData ? "Edit User" : "Add New User"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Username
                    </label>
                    <input
                        required
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Password{" "}
                        {initialData && (
                            <span className="text-slate-400 font-normal lowercase">
                                (leave blank to keep current)
                            </span>
                        )}
                    </label>
                    <input
                        required={!initialData}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={
                            initialData ? "••••••••" : "Enter password"
                        }
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-sm"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-sm"
                >
                    {initialData ? "Update User" : "Save User"}
                </button>
            </div>
        </form>
    );
}
