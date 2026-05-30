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
        if (initialData && !payload.password) delete payload.password;
        onSubmit(payload);
    };

    return (
        <div className="bg-white p-4 border border-slate-200 rounded-sm mb-4 shrink-0 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-slate-800">
                    {initialData ? "Edit User" : "Add New User"}
                </h2>
                {initialData && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-[10px] text-slate-400 hover:text-slate-800 font-bold uppercase transition-colors"
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-3 md:items-center"
            >
                <div className="w-full md:flex-1">
                    <input
                        required
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:flex-1">
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:flex-1">
                    <input
                        required={!initialData}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={
                            initialData ? "Leave blank to keep old" : "Password"
                        }
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:w-32">
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-slate-500 text-slate-600"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto bg-slate-800 text-white px-5 py-1.5 text-sm font-medium rounded-sm hover:bg-slate-700 transition-colors"
                >
                    {initialData ? "Update" : "Create"}
                </button>
            </form>
        </div>
    );
}
