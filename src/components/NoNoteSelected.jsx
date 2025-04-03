import EmptyNoteImg from "../assets/empty-note.png";

//this is also not implemented
export default function NoNoteSelected() {
  return (
    <div>
      <img
        src={EmptyNoteImg}
        alt="An empty note list."
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2>No note selected.</h2>
      <p>Select a project or get started with a new one.</p>
      <button>Create new note</button>
    </div>
  );
}
