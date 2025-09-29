import AddIcon from "./AddIcon";
import Button from "./TagButton";
import { useState } from "react";

export default function CreateNote({
  handleInputChange,
  handleSave,
  newNote,
  handleTagChange,
  selectedTag,
  isEditing,
}) {
  return (
    <>
      <section className="note-container ">
        <h2 className="title" key={isEditing ? "editing" : "creating"}>
          {isEditing ? (
            <div className="editing-note">
              ✏️ Editing Note — Don&#39;t forget to save!
            </div>
          ) : (
            "📝 Create a Note"
          )}
        </h2>

        <div className="tag-buttons">
          <Button handleTagChange={handleTagChange} selectedTag={selectedTag} />
        </div>
        <div>
          <div className="title-save">
            <input
              autoFocus
              className="create-title"
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
          </div>

          <textarea
            className="note-textarea"
            onChange={handleInputChange}
            name="content"
            placeholder="Take a note..."
            rows="3"
            value={newNote.content}
            required
          />
        </div>
      </section>
    </>
  );
}
