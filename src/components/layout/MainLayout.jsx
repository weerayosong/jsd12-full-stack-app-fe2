import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    // mobile - sidebar false
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans antialiased">
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
                ></div>
            )}

            {/* LEFT column: Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* RIGHT column: anything else */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* top: Header */}
                <Header
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                {/* bottom: Outlet */}
                <main className="flex-1 bg-slate-50 overflow-hidden flex flex-col">
                    <div className="flex-1 p-4 md:p-8 overflow-hidden h-full overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
