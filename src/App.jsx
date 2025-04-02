import "./App.css";
import { useState, useEffect } from "react";
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import SideContainer from "./components/SideContainer";

function App() {
  const predefinedTags = ["Ideas", "Personal", "Shopping", "Urgent", "Work"];

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedTag, setSelectedTag] = useState("");

  const [activeNoteId, setActiveNoteId] = useState(null);

  const [newNote, setNewNote] = useState({
    noteId: null,
    title: "",
    content: "",
    tag: selectedTag,
  });

  // useEffect(() => {
  //   console.log(selectedTag);
  // }, [selectedTag]);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setNewNote((prevNote) => {
      return { ...prevNote, tag: tag };
    });
  };

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
    if (
      !newNote.title.trim() ||
      !newNote.content.trim() ||
      !newNote.tag.trim()
    ) {
      return;
    }

    let updatedNotes;

    if (newNote.noteId) {
      updatedNotes = notes.map((note) =>
        newNote.noteId === note.noteId ? { ...newNote } : note
      );
    } else {
      updatedNotes = [
        ...notes,
        { ...newNote, noteId: Date.now(), tag: selectedTag },
      ];
    }

    console.log(updatedNotes);
    setNotes(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSelectedTag(newNote.tag);

    setNewNote({ noteId: null, title: "", content: "", tag: "" });
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
    if (noteToEdit)
      setNewNote({
        noteId: noteToEdit.noteId,
        title: noteToEdit.title,
        content: noteToEdit.content,
        tag: noteToEdit.tag,
      });
  };

  let content;

  return (
    <>
      <Header />
      <div className="app-container">
        <CreateNote
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          newNote={newNote}
          handleTagChange={handleTagChange}
          tags={predefinedTags}
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
