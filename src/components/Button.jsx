import PredefinedTags from "./PredefinedTags";

export default function Button({ handleTagChange, selectedTag }) {
  return (
    <ul>
      {PredefinedTags.map((tagObj, index) => {
        return (
          <button
            key={index}
            onClick={() => handleTagChange(tagObj.tag)}
            className={`tag-btn ${
              selectedTag === tagObj.tag ? "selected" : ""
            }`}
            style={{ backgroundColor: tagObj.color }}
          >
            {tagObj.tag}
          </button>
        );
      })}
    </ul>
  );
}
