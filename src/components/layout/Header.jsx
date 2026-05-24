import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white border-b  border-slate-200 h-16 flex items-center justify-center px-6 shrink-0">
            <div className="font-semibold text-slate-700 mr-2">
                JSD12 Dashboard
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">
                    Welcome,{" "}
                    <span className="font-bold text-slate-800">
                        {user?.username}
                    </span>
                </span>
                <button
                    onClick={handleLogout}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-sm font-medium transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
