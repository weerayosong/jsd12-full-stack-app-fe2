const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3002/api/v2"}/notes`;

export const NoteService = {
    getAll: async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to fetch notes");
        return result.data || result;
    },

    create: async (noteData) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(noteData),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to create note");
        return result.data || result;
    },

    update: async (id, noteData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(noteData),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to update note");
        return result.data || result;
    },

    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Failed to delete note");
        return result;
    },
};
