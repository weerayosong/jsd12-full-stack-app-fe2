import { useState } from "react";

export default function NoteForm({ onSubmit, onCancel, initialData = null }) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        content: initialData?.content || "",
        isCompleted: initialData?.isCompleted || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm mb-6"
        >
            <h2 className="text-lg font-bold text-slate-800 mb-4">
                {initialData ? "Edit Note" : "Add New Note"}
            </h2>
            <div className="space-y-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Title
                    </label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Content
                    </label>
                    <textarea
                        required
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500 resize-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isCompleted"
                        id="isCompleted"
                        checked={formData.isCompleted}
                        onChange={handleChange}
                        className="w-4 h-4 text-slate-800 bg-gray-100 border-gray-300 rounded focus:ring-slate-500 cursor-pointer"
                    />
                    <label
                        htmlFor="isCompleted"
                        className="text-sm font-medium text-slate-700 cursor-pointer"
                    >
                        Mark as Completed
                    </label>
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
                    {initialData ? "Update Note" : "Save Note"}
                </button>
            </div>
        </form>
    );
}
