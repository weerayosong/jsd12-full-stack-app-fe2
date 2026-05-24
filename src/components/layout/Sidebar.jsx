import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
            isActive
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`;

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-lg font-bold text-white tracking-wider">
                    Menu
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                </NavLink>
                <NavLink to="/products" className={navLinkClass}>
                    Products
                </NavLink>

                {/* test admin */}
                {user?.role === "admin" && (
                    <NavLink to="/users" className={navLinkClass}>
                        Users Directory
                    </NavLink>
                )}

                <NavLink to="/notes" className={navLinkClass}>
                    Notes
                </NavLink>
            </nav>

            <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                2026 &copy; yosong.dev
            </div>
        </aside>
    );
}
