import { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await AuthService.getMe();
                setUser(userData); // good cookie
            } catch {
                setUser(null); // bad cookie - guest
            } finally {
                setIsCheckingAuth(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email, password) => {
        try {
            const userData = await AuthService.login(email, password);
            setUser(userData);
            return { success: true };
        } catch (err) {
            return { success: false, message: err.message };
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } catch (err) {
            console.error(err);
        } finally {
            setUser(null);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="flex h-screen items-center justify-center text-slate-500 text-sm animate-pulse">
                Loading session...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook for auth in every page
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
