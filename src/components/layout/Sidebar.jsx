import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import { FaChartPie, FaBoxOpen, FaUsers, FaNoteSticky } from "react-icons/fa6";

export default function Sidebar({ isOpen, setIsOpen }) {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    // flex
    const navClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors ${
            isActive
                ? "bg-slate-800 text-slate-200 font-medium"
                : "hover:bg-slate-800 hover:text-slate-200"
        }`;

    return (
        <aside
            className={`w-64 bg-slate-900 text-slate-400 flex flex-col border-r border-slate-800 shrink-0 fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
        >
            <div className="h-16 flex flex-col justify-center items-center px-6 border-b border-slate-800 bg-slate-950/30">
                <span className="text-xs md:text-sm font-bold text-slate-400 tracking-wider uppercase">
                    JSD12 Full Stack App
                </span>
                <p>User/Admin Dashboard</p>
            </div>

            <nav
                className="flex-1 px-4 py-6 space-y-1 overflow-y-auto"
                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
                <p className="px-3 text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-2">
                    Main Menu
                </p>

                <NavLink to="/dashboard" className={navClass}>
                    <FaChartPie className="text-lg opacity-80" /> Dashboard
                    Overview
                </NavLink>
                <NavLink to="/products" className={navClass}>
                    <FaBoxOpen className="text-lg opacity-80" /> Products
                    Inventory
                </NavLink>

                {isAdmin && (
                    <>
                        <NavLink to="/users" className={navClass}>
                            <FaUsers className="text-lg opacity-80" /> Users
                            Directory
                        </NavLink>
                        <NavLink to="/notes" className={navClass}>
                            <FaNoteSticky className="text-lg opacity-80" />{" "}
                            Notes Memo
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="p-4 border-t border-slate-800 bg-slate-950/20 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-700 flex items-center justify-center rounded-sm text-xs text-slate-200 font-bold uppercase">
                    {user?.username?.charAt(0) || "?"}
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-200 truncate w-32">
                        {user?.username}
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">
                        {user?.role}
                    </span>
                </div>
            </div>
        </aside>
    );
}
