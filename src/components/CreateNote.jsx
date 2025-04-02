import AddIcon from "./AddIcon";
import { useEffect } from "react";

export default function CreateNote({
  handleInputChange,
  handleSave,
  newNote,
  tags,
  handleTagChange,
}) {
  // useEffect(()=>{
  //   console.log(selectedTag);
  // }, selectedTag)
  return (
    <>
      <section className="note-container ">
        <h1 className="title">Create a Note</h1>
        <div className="tag-buttons">
          <ul>
            {tags.map((tag) => {
              return (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`tag-btn ${newNote.tag === tag ? "selected" : ""}`}
                >
                  {tag}
                </button>
              );
            })}
          </ul>
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
