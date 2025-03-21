import "./App.css";
import { useState } from "react";
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import SideContainer from "./components/SideContainer";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
      console.error("Error loading notes from localStorage:", error);
      return [];
    }
  });

  const [newNote, setNewNote] = useState({
    noteId: null,
    title: "",
    content: "",
  });
  const [activeNoteId, setActiveNoteId] = useState(null);

  function clickHandler(id) {
    setActiveNoteId(id);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      return;
    }

    let updatedNotes;
    if (newNote.noteId > 0) {
      updatedNotes = notes.map((note) =>
        newNote.noteId === note.noteId ? newNote : note
      );
    } else {
      updatedNotes = [...notes, { ...newNote, noteId: Date.now() }];
    }
    console.log(updatedNotes);
    setNotes(updatedNotes);
    // setActiveNoteId(updatedNotes[0].noteId);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNewNote({ noteId: null, title: "", content: "" });
  };

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete? This action is not reversible."
    );
    if (!confirmDelete) return;

    const updatedNotes = notes.filter((note) => note.noteId !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const editHandler = (id) => {
    const noteToEdit = notes.find((note) => note.noteId === id);
    // console.log(noteToEdit);
    if (noteToEdit)
      setNewNote({
        noteId: noteToEdit.noteId,
        title: noteToEdit.title,
        content: noteToEdit.content,
      });
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <CreateNote
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          newNote={newNote}
        />
        <SideContainer
          notesArr={notes}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          clickHandler={clickHandler}
          activeNoteId={activeNoteId}
        />
      </div>
    </>
  );
}
export default App;
