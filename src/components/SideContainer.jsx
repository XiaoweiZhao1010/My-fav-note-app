export default function SideContainer({
  deleteHandler,
  editHandler,
  clickHandler,
  activeNoteId,
  filteredNotes,
  doubleClickHandler,
}) {
  return (
    <section className="notes-sidebar">
      <h2 className="notes-title" style={{ marginBottom: "10px" }}>
        Notes
      </h2>
      <ul>
        {filteredNotes?.length > 0 ? (
          filteredNotes
            ?.sort((a, b) => b.noteId - a.noteId)
            .map((note) => (
              <li
                className={`note-list-item ${
                  activeNoteId === note.noteId ? "active" : ""
                }`}
                onClick={() => clickHandler(note.noteId)}
                onDoubleClick={() => doubleClickHandler(note)}
                key={note.noteId}
              >
                {note.content.slice(0, 40) + "..."}
                <div className="button-group">
                  <button className="tag-btn">{note.tag}</button>
                  <button onClick={() => editHandler(note.noteId)}>Edit</button>
                  <button onClick={() => deleteHandler(note.noteId)}>X</button>
                </div>
              </li>
            ))
        ) : (
          <p>No notes found yet! Go create one!</p>
        )}
      </ul>
    </section>
  );
}
