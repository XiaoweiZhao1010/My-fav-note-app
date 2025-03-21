import AddIcon from "./AddIcon";
export default function CreateNote({ handleInputChange, handleSave, newNote }) {
  return (
    <>
      <section className="note-container ">
        <h1 className="title">Create a Note</h1>
        <input
          className="note-title"
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder="Here goes your title..."
          value={newNote.title}
          required
        />
        <button className="save-btn" onClick={handleSave}>
          <AddIcon />
        </button>
        <textarea
          className="note-textarea"
          onChange={handleInputChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={newNote.content}
          required
        />
      </section>
    </>
  );
}
