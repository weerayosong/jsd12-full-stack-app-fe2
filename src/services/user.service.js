const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2"}/users`;

export const UserService = {
    getAll: async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to fetch users");
        return result.data || result;
    },

    create: async (userData) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to create user");
        return result.data || result;
    },

    update: async (id, userData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to update user");
        return result.data || result;
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to delete user");
        return result;
    },
};
