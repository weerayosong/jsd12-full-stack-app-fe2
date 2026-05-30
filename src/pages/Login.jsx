import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("aaaaaaaa");

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user, login } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const result = await login(email, password);

        setLoading(false);
        if (result.success) {
            navigate("/dashboard");
        } else {
            setError(result.message || "Something went wrong");
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center p-4 bg-slate-50 text-slate-800 font-sans antialiased">
            <div className="w-full max-w-sm bg-white p-8 border border-gray-200 rounded-sm shadow-sm text-center">
                <h1 className="text-xl font-bold text-slate-800">Login</h1>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                    JSD12 User Dashboard
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 border border-red-200 text-xs p-3 mb-4 rounded-sm text-left font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500 disabled:bg-slate-100"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500 disabled:bg-slate-100"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-800 text-white py-2 mt-2 text-sm font-medium rounded-sm hover:bg-slate-700 transition-colors disabled:bg-slate-400 cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
