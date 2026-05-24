import { useState } from "react";

export default function ProductForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        inStock: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,

            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, price: Number(formData.price) };
        onSubmit(payload);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm mb-6"
        >
            <h2 className="text-lg font-bold text-slate-800 mb-4">
                Add New Product
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Product Name
                    </label>
                    <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Price (THB)
                    </label>
                    <input
                        required
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Category
                    </label>
                    <select
                        required
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    >
                        <option value="">Select Category...</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                            className="w-4 h-4 text-slate-800 border-gray-300 rounded focus:ring-slate-500"
                        />
                        In Stock
                    </label>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="2"
                        className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-sm transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-sm transition-colors"
                >
                    Save Product
                </button>
            </div>
        </form>
    );
}
