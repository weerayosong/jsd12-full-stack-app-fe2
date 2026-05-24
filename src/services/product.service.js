const API_URL = "http://localhost:3002/api/v2/products";

export const ProductService = {
    getAll: async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            // credentials: 'include'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || result.error || "Failed to fetch products",
            );
        }

        return result.data || result;
    },
};
