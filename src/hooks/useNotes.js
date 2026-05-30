import { useState, useEffect } from "react";
import { NoteService } from "../services/note.service";

export const useNotes = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const data = await NoteService.getAll();
            setNotes(data);
            setError(null);
        } catch (err) {
            setError(err.message || "Failed to fetch notes");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchNotes();
    }, []);

    const addNote = async (formData) => {
        try {
            await NoteService.create(formData);
            fetchNotes();
            return true;
        } catch (err) {
            alert("Error adding note: " + err.message);
            return false;
        }
    };

    const updateNote = async (id, formData) => {
        try {
            await NoteService.update(id, formData);
            fetchNotes();
            return true;
        } catch (err) {
            alert("Error updating note: " + err.message);
            return false;
        }
    };

    const deleteNote = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?"))
            return;
        try {
            await NoteService.delete(id);
            setNotes(notes.filter((n) => n._id !== id));
        } catch (err) {
            alert("Error deleting note: " + err.message);
        }
    };

    const toggleComplete = async (note) => {
        await updateNote(note._id, { isCompleted: !note.isCompleted });
    };

    return {
        notes,
        isLoading,
        error,
        addNote,
        updateNote,
        deleteNote,
        toggleComplete,
    };
};
