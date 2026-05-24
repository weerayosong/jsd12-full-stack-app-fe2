import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/ui/ProductForm";
import ProductTable from "../components/ui/ProductTable";

export default function Products() {
    const { products, isLoading, error, addProduct, deleteProduct } =
        useProducts();
    const [showForm, setShowForm] = useState(false);

    const handleCreateProduct = async (formData) => {
        const success = await addProduct(formData);
        if (success) {
            setShowForm(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Products Inventory
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your store items
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-sm transition-colors shadow-sm"
                    >
                        + Add Product
                    </button>
                )}
            </div>

            {showForm && (
                <ProductForm
                    onSubmit={handleCreateProduct}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-40 text-slate-400 text-sm">
                    <span className="animate-pulse">Loading products...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200 text-sm">
                    {error}
                </div>
            ) : (
                <ProductTable data={products} onDelete={deleteProduct} />
            )}
        </div>
    );
}
