import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 border-b border-gray-200 pb-2 md:pb-4">
                My Profile
            </h1>
            <div className="bg-white p-6 md:p-8 border border-gray-200 rounded-sm flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-100 border border-slate-200 rounded-sm flex items-center justify-center text-3xl md:text-4xl font-bold text-slate-800 uppercase">
                    {user?.username?.charAt(0) || "?"}
                </div>
                <div className="flex-1 space-y-3 md:space-y-4 w-full">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Username
                        </label>
                        <div className="text-lg font-bold text-slate-800">
                            {user?.username}
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Email
                        </label>
                        <div className="text-sm text-slate-600">
                            {user?.email}
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-3 md:border-0 md:pt-0">
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                            Role
                        </label>
                        <div className="inline-block bg-slate-800 text-white px-2 py-0.5 text-[10px] uppercase rounded-sm font-bold">
                            {user?.role}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
