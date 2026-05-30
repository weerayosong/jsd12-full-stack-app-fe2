import { useState } from "react";

export default function ProductForm({
    onSubmit,
    onCancel,
    initialData = null,
}) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        category: initialData?.category || "",
        price: initialData?.price || "",
        desc: initialData?.desc || "",
        inStock: initialData?.inStock ?? true,
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
        onSubmit({ ...formData, price: Number(formData.price) });
    };

    return (
        <div className="bg-white p-4 border border-slate-200 rounded-sm mb-4 shrink-0 shadow-sm">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-bold text-slate-800">
                    {initialData ? "Edit Product" : "Add New Product"}
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:w-32">
                    <input
                        required
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:w-28">
                    <input
                        required
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-full md:flex-1">
                    <input
                        type="text"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border border-gray-300 rounded-sm px-3 py-1.5 text-sm focus:outline-none focus:border-slate-500 placeholder:text-slate-400"
                    />
                </div>
                <div className="flex items-center gap-2 px-1 shrink-0">
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={handleChange}
                        className="accent-slate-800 w-3.5 h-3.5 cursor-pointer"
                    />
                    <label
                        htmlFor="inStock"
                        className="text-xs text-slate-600 cursor-pointer"
                    >
                        In Stock
                    </label>
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
