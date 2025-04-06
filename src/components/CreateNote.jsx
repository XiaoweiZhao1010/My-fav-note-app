import AddIcon from "./AddIcon";
import Button from "./Button";
// import PredefinedTags from "./PredefinedTags";
// import { useEffect } from "react";

export default function CreateNote({
  handleInputChange,
  handleSave,
  newNote,
  handleTagChange,
  selectedTag,
}) {
  const isEditing = newNote.noteId !== null;

  // useEffect(()=>{
  //   console.log(selectedTag);
  // }, selectedTag)
  return (
    <>
      <section className="note-container ">
        {/* key ={...} forces React to rerender so creating a note also have a great effect when triggered */}
        <h1 className="title" key={isEditing ? "editing" : "creating"}>
          {isEditing ? (
            <div className="editing-note">
              ✏️ Editing Note — Don&#39;t forget to save!
            </div>
          ) : (
            "📝 Create a Note"
          )}
        </h1>

        <div className="tag-buttons">
          <Button handleTagChange={handleTagChange} selectedTag={selectedTag} />
        </div>
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
