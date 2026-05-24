import { useState, useEffect } from "react";
import { UserService } from "../services/user.service";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await UserService.getAll();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    const addUser = async (formData) => {
        try {
            await UserService.create(formData);
            fetchUsers();
            return true;
        } catch (err) {
            alert("Error adding user: " + err.message);
            return false;
        }
    };

    const updateUser = async (id, formData) => {
        try {
            await UserService.update(id, formData);
            fetchUsers();
            return true;
        } catch (err) {
            alert("Error updating user: " + err.message);
            return false;
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;
        try {
            await UserService.delete(id);
            setUsers(users.filter((u) => u._id !== id));
        } catch (err) {
            alert("Error deleting user: " + err.message);
        }
    };

    return { users, isLoading, error, addUser, updateUser, deleteUser };
};
