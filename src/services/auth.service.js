const API_URL = "http://localhost:3002/api/v2/users";

export const AuthService = {
    // login
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        const result = await response.json();
        if (!response.ok)
            throw new Error(result.message || "Invalid email or password");

        return result.userInDB;
    },

    // auth me
    getMe: async () => {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) throw new Error("Not authenticated");
        return result.data;
    },

    // logout
    logout: async () => {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    },
};
