import { useAuth } from "../contexts/AuthContext";
import { useProducts } from "../hooks/useProducts";
import { useUsers } from "../hooks/useUsers";
import { useNotes } from "../hooks/useNotes";

export default function Dashboard() {
    // role
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const { products } = useProducts();
    const { users } = useUsers();
    const { notes } = useNotes();

    const pendingNotes = notes.filter((n) => !n.isCompleted);

    const recentProducts = [...products].reverse().slice(0, 5);

    return (
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6 flex-1 overflow-y-auto pr-1 md:pr-2 pb-6">
            <div className="shrink-0 border-b border-gray-200 pb-2 md:pb-4">
                <h1 className="text-xl md:text-2xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 shrink-0">
                <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-sm shadow-sm">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Total Products
                    </span>
                    <span className="text-2xl md:text-4xl font-bold text-slate-800">
                        {products.length}
                    </span>
                </div>

                {isAdmin ? (
                    <>
                        <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-sm shadow-sm">
                            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Total Users
                            </span>
                            <span className="text-2xl md:text-4xl font-bold text-slate-800">
                                {users.length}
                            </span>
                        </div>
                        <div className="bg-white p-4 md:p-6 border border-gray-200 rounded-sm shadow-sm">
                            <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                Active Notes
                            </span>
                            <span className="text-2xl md:text-4xl font-bold text-slate-800">
                                {pendingNotes.length}
                            </span>
                        </div>
                    </>
                ) : (
                    // mock block
                    <div className="hidden md:block col-span-2"></div>
                )}
            </div>

            <div
                className={`grid grid-cols-1 ${isAdmin ? "lg:grid-cols-3" : ""} gap-4 md:gap-6`}
            >
                <div
                    className={`${isAdmin ? "lg:col-span-2" : ""} bg-white border border-gray-200 rounded-sm shadow-sm`}
                >
                    <div className="px-4 py-3 border-b border-gray-200 bg-slate-50/80">
                        <h2 className="text-sm font-bold text-slate-800">
                            Highlight Products
                        </h2>
                    </div>
                    <div className="p-4 space-y-1">
                        {recentProducts.length > 0 ? (
                            recentProducts.map((p) => (
                                <div
                                    key={p._id}
                                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                                >
                                    <div className="truncate pr-2">
                                        <p className="text-[13px] md:text-sm font-bold text-slate-700 truncate">
                                            {p.name}
                                        </p>
                                        <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                                            {p.category}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[13px] md:text-sm font-mono font-medium text-slate-600">
                                            ฿ {p.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-slate-400 text-center py-4">
                                No products available.
                            </p>
                        )}
                    </div>
                </div>

                {isAdmin && (
                    <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
                        <div className="px-4 py-3 border-b border-gray-200 bg-slate-50/80">
                            <h2 className="text-sm font-bold text-slate-800">
                                Pending Notes
                            </h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {pendingNotes.length > 0 ? (
                                pendingNotes.slice(0, 5).map((n) => (
                                    <div
                                        key={n._id}
                                        className="p-3 border border-slate-200 bg-slate-50 rounded-sm border-l-4 border-l-slate-800"
                                    >
                                        <h3 className="text-xs md:text-sm font-bold text-slate-800 truncate">
                                            {n.title}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 mt-1 truncate">
                                            {n.content}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-slate-400 text-center py-4">
                                    No pending Notes.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
