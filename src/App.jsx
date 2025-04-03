import "./App.css";
import { useState, useEffect } from "react";
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import SideContainer from "./components/SideContainer";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [selectedTag, setSelectedTag] = useState(null);

  const [activeNoteId, setActiveNoteId] = useState(null);

  const [newNote, setNewNote] = useState({
    noteId: null,
    title: "",
    content: "",
    tag: selectedTag,
  });
  const [selectedNote, setSelectedNote] = useState(null);

  // useEffect(() => {
  //   if (selectedNote) {
  //     console.log(selectedNote);
  //   }
  // }, [selectedNote]);

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setNewNote((prevNote) => {
      return { ...prevNote, tag: tag };
    });
  };
  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tag === selectedTag)
    : notes;

  function clickHandler(id) {
    setActiveNoteId(id);
  }
  function doubleClickHandler(note) {
    setSelectedNote({ ...note });
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

  return (
    <>
      <Header />
      <div className="app-container">
        <CreateNote
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          newNote={newNote}
          handleTagChange={handleTagChange}
          selectedTag={selectedTag}
        />
        <SideContainer
          notesArr={notes}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
          clickHandler={clickHandler}
          activeNoteId={activeNoteId}
          filteredNotes={filteredNotes}
          selectedTag={selectedTag}
          doubleClickHandler={doubleClickHandler}
        />
      </div>
      {selectedNote && (
        <>
          <div className="modal-overlay"></div>
          <div className="note-modal">
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
            <button onClick={() => setSelectedNote(null)}>Close</button>
          </div>
        </>
      )}
    </>
  );
}
export default App;
