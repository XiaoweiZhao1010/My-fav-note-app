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
            ?.sort((a, b) => b.id - a.id)
            .map((note, index) => (
              <li
                className={`note-list-item ${
                  activeNoteId === note.id ? "active" : ""
                }`}
                onClick={() => clickHandler(note.id)}
                onDoubleClick={() => doubleClickHandler(note)}
                key={note.id || `note-${index}`}
              >
                {note.content.slice(0, 40) + "..."}
                <div className="button-group">
                  <button className="tag-btn">{note.tag}</button>
                  <button onClick={() => editHandler(note.id)}>Edit</button>
                  <button onClick={() => deleteHandler(note.id)}>X</button>
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
