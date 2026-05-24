import { useState, useEffect } from "react";
import { ProductService } from "../services/product.service";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
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

        fetchProducts();
    }, []);

    // mock del
    const deleteProduct = (id) => {
        setProducts(products.filter((p) => p._id !== id));
    };

    return { products, isLoading, error, deleteProduct };
};
