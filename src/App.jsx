// import "./styles/App.css";
import "./styles/header.css";
import { useReducer } from "react";
import { useAuth } from "./hooks/useAuth";
import { useNotes } from "./hooks/useNotes";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Button from "./ui/Button";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import CreateNote from "./components/CreateNote";

export default function App() {
  const [activeTab, setActiveTab] = useReducer((_, action) => action, "notes");
  const [searchText, setSearchText] = useReducer((_, action) => action, "");
  const [showSuggestions, setShowSuggestions] = useReducer(
    (_, action) => action,
    false
  );
  const { user, login, logout } = useAuth();
  const notesState = useNotes(user);

  if (!user) {
    return <AuthForm onLogin={login} />;
  }

  return (
    <>
      <Header>
        <nav className="nav-links">
          <button
            className="nav-button"
            onClick={() => setActiveTab("notes")}
            style={{ background: activeTab === "notes" ? "#e0e0e0" : "none" }}
          >
            Notes
          </button>
          <button
            className="nav-button"
            onClick={() => setActiveTab("createNote")}
            style={{
              background: activeTab === "createNote" ? "#e0e0e0" : "none",
            }}
          >
            Create a note
          </button>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            filteredNotes={notesState.filteredNotes}
            setActiveTab={setActiveTab}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
          />
        </nav>

        <Button text="Log out" className="log-out-btn" onClick={logout} />
      </Header>

      {notesState.loading ? (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <span>Loading notes...</span>
        </div>
      ) : (
        <>
          {activeTab === "notes" ? (
            <Notes
              deleteHandler={notesState.deleteHandler}
              clickHandler={notesState.clickHandler}
              editHandler={(id) => {
                setActiveTab("createNote");
                notesState.editHandler(id);
              }}
              filteredNotes={notesState.filteredNotes}
              doubleClickHandler={notesState.doubleClickHandler}
            />
          ) : (
            <CreateNote
              handleInputChange={notesState.handleInputChange}
              handleSave={() =>
                notesState.handleSave((id) => setActiveTab("notes"))
              }
              newNote={notesState.newNote}
              handleTagChange={notesState.handleTagChange}
              selectedTag={notesState.selectedTag}
              isEditing={notesState.isEditing}
            />
          )}
        </>
      )}
      {notesState.selectedNote && (
        <>
          <div
            className="modal-overlay"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
            onClick={notesState.closeModal}
            style={{ cursor: "pointer" }}
          ></div>
          <div
            className="note-modal"
            role="document"
            tabIndex={0}
            aria-labelledby="modal-title"
            aria-describedby="modal-content"
            onKeyDown={(e) => {
              if (e.key === "Escape") notesState.closeModal();
            }}
            autoFocus
          >
            <h2 id="modal-title">{notesState.selectedNote.title}</h2>
            <p id="modal-content">{notesState.selectedNote.content}</p>
            <button onClick={notesState.closeModal} autoFocus>
              Close
            </button>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
