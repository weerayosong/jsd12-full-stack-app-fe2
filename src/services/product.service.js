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
    // POST
    create: async (productData) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to create product");
        return result.data || result;
    },

    // DEL
    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to delete product");
        return result;
    },
};
