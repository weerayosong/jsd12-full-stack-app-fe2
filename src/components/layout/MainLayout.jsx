import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans antialiased">
            {/* LEFT column: Sidebar */}
            <Sidebar />

            {/* RIGHT column: anything else */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* top: Header */}
                <Header />

                {/* bottom: Outlet */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
