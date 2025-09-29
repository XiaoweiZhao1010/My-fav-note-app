import React from "react";

export default function SearchBar({
  searchText,
  setSearchText,
  filteredNotes,
  setActiveTab,
  showSuggestions,
  setShowSuggestions,
}) {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <input
        type="text"
        className="search-input"
        placeholder="Search notes..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setShowSuggestions(true);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setShowSuggestions(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setActiveTab("notes");
            setShowSuggestions(false);
          }
        }}
        style={{ marginLeft: "1rem" }}
        autoComplete="off"
      />
      {showSuggestions && searchText.trim() && (
        <ul className="dropdown-menu">
          {filteredNotes.length > 0 ? (
            filteredNotes.slice(0, 8).map((note) => (
              <li
                key={note.id}
                style={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
                onMouseDown={() => {
                  setSearchText(note.title);
                  setActiveTab("notes");
                  setShowSuggestions(false);
                }}
              >
                <strong>{note.title}</strong>
                <div style={{ fontSize: "0.85em", color: "#666" }}>
                  {note.content.slice(0, 40)}...
                </div>
              </li>
            ))
          ) : (
            <li style={{ padding: "0.5rem 1rem", color: "#999" }}>
              No matches found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
