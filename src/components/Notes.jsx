import { useState } from "react";
import DeleteConfirmModal from "./DeleteConfirmModal";
export default function Notes({
  deleteHandler,
  clickHandler,
  filteredNotes,
  editHandler,
  doubleClickHandler,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
    setModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      deleteHandler(pendingDeleteId);
      setModalOpen(false);
      setPendingDeleteId(null);
    }
  };
  const handleCancelDelete = () => {
    setModalOpen(false);
    setPendingDeleteId(null);
  };

  return (
    <section>
      <ul className="notes">
        {filteredNotes?.length > 0 ? (
          filteredNotes
            ?.sort((a, b) => b.id - a.id)
            .map((note, index) => (
              <li
                className="note-card"
                onClick={() => clickHandler(note.id)}
                onDoubleClick={() => doubleClickHandler(note)}
                key={note.id || `note-${index}`}
              >
                <div
                  className="note-row-flex"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <button className="tag-btn">{note.tag}</button>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="button-group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(note.id);
                      }}
                    >
                      X
                    </button>
                    <button
                      className="button-group"
                      onClick={(e) => {
                        e.stopPropagation();
                        editHandler(note.id);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <p>
                  <span className="note-title">
                    {note.title.slice(0, 20) + "..."}
                  </span>
                </p>
                <p className="note-textarea">
                  <span>{note.content.slice(0, 40) + "..."}</span>
                </p>
              </li>
            ))
        ) : (
          <p className="no-notes">No notes found yet! Go create one!</p>
        )}
      </ul>
      <DeleteConfirmModal
        open={modalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </section>
  );
}
