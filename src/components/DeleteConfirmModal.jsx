import React from "react";

export default function DeleteConfirmModal({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <div className="note-modal" style={{ zIndex: 2001, textAlign: "center" }}>
        <h2>Confirm Delete</h2>
        <p>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            style={{ background: "#cb7474", color: "white" }}
            onClick={onConfirm}
          >
            Delete
          </button>
          <button style={{ background: "#eee" }} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
