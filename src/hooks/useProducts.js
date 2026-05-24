import { useState, useEffect } from "react";
import { ProductService } from "../services/product.service";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = await ProductService.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // eslint-disable-line react-hooks/set-state-in-effect
    }, []);

    // CREATE
    const addProduct = async (formData) => {
        try {
            await ProductService.create(formData); // create
            fetchProducts(); // create done, then refetch
            return true;
        } catch (err) {
            alert("Error adding product: " + err.message);
            return false;
        }
    };

    // UPDATE
    const updateProduct = async (id, formData) => {
        try {
            await ProductService.update(id, formData);
            fetchProducts(); // update done, then refetch
            return true;
        } catch (err) {
            alert("Error updating product: " + err.message);
            return false;
        }
    };

    // DELETE
    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;

        try {
            await ProductService.delete(id);
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            alert("Error deleting product: " + err.message);
        }
    };

    return {
        products,
        isLoading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
    };
};
