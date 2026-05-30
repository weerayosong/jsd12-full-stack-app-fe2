import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";

import { FaBars } from "react-icons/fa6";

export default function Header({ toggleSidebar }) {
    const { user, logout } = useAuth();
    const location = useLocation(); // location.pathname >> '/products' or '/users'

    // channge title from switch()
    const getPageTitle = () => {
        switch (location.pathname) {
            case "/products":
                return "Products Inventory";
            case "/users":
                return "Users Directory";
            case "/notes":
                return "Notes Memo";
            default:
                return "Dashboard Overview";
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
            <div className="flex items-center gap-3">
                {/* mobile: hamergur bar */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
                >
                    <FaBars className="text-xl" />
                </button>
                <div className="text-sm font-medium text-slate-500 hidden sm:block">
                    {/* getPageTitle() */}
                    <span className="text-slate-400">Pages</span> /{" "}
                    <span className="text-slate-800 font-semibold">
                        {getPageTitle()}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="text-xs md:text-sm text-right flex items-center">
                    <span className="text-slate-500 hidden md:inline mr-1">
                        Hello,{" "}
                    </span>
                    <span className="font-bold text-slate-800">
                        {user?.username}
                    </span>
                    <span className="hidden md:inline-block text-[10px] px-2 py-0.5 ml-2 rounded-sm bg-slate-800 text-white uppercase font-bold">
                        {user?.role}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="text-xs font-medium text-red-500 hover:text-red-700 ml-2 md:ml-0 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
