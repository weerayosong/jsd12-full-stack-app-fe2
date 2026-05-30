import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserCard from "../components/ui/UserCard";
import UserForm from "../components/ui/UserForm";

export default function Users() {
    const { users, isLoading, error, addUser, updateUser, deleteUser } =
        useUsers();
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        let success;
        if (editingUser) {
            success = await updateUser(editingUser._id, formData);
        } else {
            success = await addUser(formData);
        }
        if (success) handleCloseForm();
    };

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Users Directory
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage corporate accounts and authorization roles
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-sm shadow-sm"
                    >
                        + Add User
                    </button>
                )}
            </div>

            {showForm && (
                <UserForm
                    key={editingUser ? editingUser._id : "new_user"}
                    initialData={editingUser}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseForm}
                />
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-40 text-slate-400 text-sm">
                    <span className="animate-pulse">
                        Loading users directory...
                    </span>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200 text-sm">
                    {error}
                </div>
            ) : (
                // <UserTable
                //     data={users}
                //     onEdit={handleEditClick}
                //     onDelete={deleteUser}
                // />
                // change from 'Table' to grided 'card' style
                <div className="flex-1 overflow-y-auto min-h-0 pr-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                        {users.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                onEdit={handleEditClick}
                                onDelete={deleteUser}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
