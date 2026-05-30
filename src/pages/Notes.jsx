import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import NoteForm from "../components/ui/NoteForm";
import NoteCard from "../components/ui/NoteCard";

export default function Notes() {
    const {
        notes,
        isLoading,
        error,
        addNote,
        updateNote,
        deleteNote,
        toggleComplete,
    } = useNotes();
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingNote(null);
    };

    const handleEditClick = (note) => {
        setEditingNote(note);
        setShowForm(true);
    };

    const handleSubmit = async (formData) => {
        let success;
        if (editingNote) success = await updateNote(editingNote._id, formData);
        else success = await addNote(formData);

        if (success) handleCloseForm();
    };

    return (
        <div className="max-w-5xl mx-auto pb-10 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Notes Memo
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your personal tasks and ideas
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-sm font-medium rounded-sm shadow-sm cursor-pointer"
                    >
                        + Add Note
                    </button>
                )}
            </div>

            {showForm && (
                <NoteForm
                    key={editingNote ? editingNote._id : "new_note"}
                    initialData={editingNote}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseForm}
                />
            )}

            {isLoading ? (
                <div className="flex justify-center items-center h-40 text-slate-400 text-sm">
                    <span className="animate-pulse">Loading notes...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200 text-sm">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onEdit={handleEditClick}
                            onDelete={deleteNote}
                            onToggleComplete={toggleComplete}
                        />
                    ))}

                    {notes.length === 0 && (
                        <p className="col-span-full text-center py-10 text-slate-400 text-sm">
                            No notes found. Create your first note!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
