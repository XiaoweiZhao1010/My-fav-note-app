export default function SideContainer({
  notesArr,
  deleteHandler,
  editHandler,
  clickHandler,
  activeNoteId,
}) {
  return (
    <section className="notes-sidebar">
      <ul>
        {notesArr.length > 0 ? (
          notesArr
            ?.sort((a, b) => b.noteId - a.noteId)
            .map((note, index) => {
              return (
                <li
                  key={note.noteId}
                  className={`note-list-item ${
                    activeNoteId === note.noteId ? "active" : ""
                  }`}
                  onClick={() => clickHandler(note.noteId)}
                >
                  {note.content.slice(0, 40) + "..."}
                  <div className="button-group">
                    <button className="tag-btn">{note.tag}</button>
                    <button onClick={() => editHandler(note.noteId)}>
                      Edit
                    </button>
                    <button onClick={() => deleteHandler(note.noteId)}>
                      X
                    </button>
                  </div>
                </li>
              );
            })
        ) : (
          <p>No notes yet.</p>
        )}
      </ul>
    </section>
  );
}
