import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("aaaaaaaa");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // btn type 'submit' !

        // mock test
        if (email === "a@a.com" && password === "aaaaaaaa") {
            login({ username: "araraki", role: "admin", email });
            navigate("/dashboard");
        } else {
            alert("bad auth!");
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center p-4 bg-slate-50 text-slate-800 font-sans antialiased">
            <div className="w-full max-w-sm bg-white p-8 border border-gray-200 rounded-sm shadow-sm text-center">
                <h1 className="text-xl font-bold text-slate-800">Login</h1>
                <p className="text-xs text-slate-500 mt-1 mb-6">
                    JSD12 User Dashboard
                </p>
                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
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
                            className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-slate-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white py-2 mt-2 text-sm font-medium rounded-sm hover:bg-slate-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
