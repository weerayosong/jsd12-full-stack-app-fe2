import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/ui/ProductForm";
import ProductTable from "../components/ui/ProductTable";
import { useAuth } from "../contexts/AuthContext";

export default function Products() {
    const {
        products,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useProducts();
    const [showForm, setShowForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);

    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        let success;
        if (editingProduct) {
            success = await updateProduct(editingProduct._id, formData);
        } else {
            success = await addProduct(formData);
        }

        if (success) handleCloseForm();
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
                {!showForm && isAdmin && (
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
                    key={editingProduct ? editingProduct._id : "new_product"}
                    initialData={editingProduct}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseForm}
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
                <ProductTable
                    data={products}
                    onEdit={handleEditClick}
                    onDelete={deleteProduct}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    );
}
