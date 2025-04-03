//not sure how to implement this in the app yet
// export default function NotesList({ notes }) {
//   return (
//     <div>
//       {notes.map((note) => (
//         <div
//           key={note.noteId}
//           className="note-list-item"
//           onClick={() => openNote(note)}
//         >
//           <h3>{note.title}</h3>
//           <p>{note.content}</p>
//         </div>
//       ))}
//       {selectedNote && (
//         <div className="note-modal">
//           <h2>{selectedNote.title}</h2>
//           <p>{selectedNote.content}</p>
//           <button onClick={() => setSelectedNote(null)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// }
