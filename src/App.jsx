import "./App.css";
import { useState, useEffect } from "react";
import CreateNote from "./components/CreateNote";
import Header from "./components/Header";
import SideContainer from "./components/SideContainer";
import AuthForm from "./components/AuthForm";
import axios from "./utils/axios";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    try {
      const parsed = JSON.parse(savedUser);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  });
  const [notes, setNotes] = useState();
  const [selectedTag, setSelectedTag] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const [newNote, setNewNote] = useState({
    id: null,
    title: "",
    content: "",
    tag: selectedTag,
  });
  const [selectedNote, setSelectedNote] = useState(null);
  useEffect(() => {
    if (selectedNote) {
      console.log(selectedNote);
    }
  }, [selectedNote]);

  //Load notes when user logs in or changes
  useEffect(() => {
    if (user) {
      axios
        .get("/notes")
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          console.error("Error fetching notes:", err);
        });
    } else {
      setNotes([]);
    }
  }, [user]);

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tag === selectedTag)
    : notes;

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setNewNote((prevNote) => {
      return { ...prevNote, tag: tag };
    });
  };

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
  const editHandler = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setNewNote({
        id: noteToEdit.id,
        title: noteToEdit.title,
        content: noteToEdit.content,
        tag: noteToEdit.tag,
      });
      setSelectedTag(noteToEdit.tag);
    }
  };

  const handleSave = () => {
    if (
      !newNote.title.trim() ||
      !newNote.content.trim() ||
      !newNote?.tag.trim()
    ) {
      return;
    }

    if (newNote.id) {
      axios
        .put(`/notes/${newNote.id}`, {
          title: newNote.title,
          content: newNote.content,
          tag: newNote.tag,
        })
        .then((res) => {
          const updatedNotes = notes.map((note) =>
            note.id === newNote.id ? res.data : note
          );
          setNotes(updatedNotes);
          //reset newNote
          setNewNote({ id: null, title: "", content: "", tag: "" });
          setSelectedTag("");
        })
        .catch((err) => {
          console.error("Error updating note:", err);
        });
    } else {
      axios
        .post("/notes", {
          title: newNote.title,
          content: newNote.content,
          tag: newNote.tag,
        })
        .then((res) => {
          setNotes([...notes, res.data]);
          //reset newNote
          setNewNote({ title: "", content: "", tag: "" });
          setSelectedTag("");
        })
        .catch((err) => {
          console.error("Error creating note:", err);
        });
    }
  };

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete? This action is not reversible."
    );
    if (!confirmDelete) return;

    axios
      .delete(`/notes/${id}`)
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
      });
  };
  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    setUser(null);
  };
  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  return (
    <>
      <Header />
      <button
        onClick={handleLogout}
        style={{
          position: "fixed",
          top: "5px",
          right: "10px",
          padding: "10px 20px",
          backgroundColor: "#d1d5db",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgb(173, 78, 91)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#d1d5db";
        }}
      >
        Log Out
      </button>
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
