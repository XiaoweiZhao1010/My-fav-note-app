import { useReducer, useEffect } from "react";
import axios from "../utils/axios";
export function useNotes(user) {
  const initialState = {
    notes: [],
    loading: false,
    filteredNotes: [],
    selectedTag: null,
    activeNoteId: null,
    isEditing: false,
    newNote: { id: null, title: "", content: "", tag: null },
    selectedNote: null,
    error: null,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_NOTES":
        return { ...state, notes: action.notes };
      case "SET_LOADING":
        return { ...state, loading: action.value };
      case "SET_SELECTED_TAG":
        return { ...state, selectedTag: action.tag };
      case "SET_ACTIVE_NOTE_ID":
        return { ...state, activeNoteId: action.id };
      case "SET_IS_EDITING":
        return { ...state, isEditing: action.value };
      case "SET_NEW_NOTE":
        return { ...state, newNote: action.note };
      case "SET_SELECTED_NOTE":
        return { ...state, selectedNote: action.note };
      case "SET_ERROR":
        return { ...state, error: action.error };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (user) {
      dispatch({ type: "SET_LOADING", value: true });
      axios
        .get("/notes")
        .then((res) => {
          dispatch({ type: "SET_NOTES", notes: res.data });
          dispatch({ type: "SET_ERROR", error: null });
        })
        .catch((err) => {
          dispatch({
            type: "SET_ERROR",
            error: "Failed to fetch notes. Please try again.",
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", value: false });
        });
    } else {
      dispatch({ type: "SET_NOTES", notes: [] });
    }
  }, [user]);

  const handleTagChange = (tag) => {
    dispatch({ type: "SET_SELECTED_TAG", tag });
    dispatch({ type: "SET_IS_EDITING", value: true });
    dispatch({ type: "SET_NEW_NOTE", note: { ...state.newNote, tag } });
  };

  const closeModal = () => {
    dispatch({ type: "SET_SELECTED_NOTE", note: null });
  };

  const clickHandler = (id) => {
    dispatch({ type: "SET_ACTIVE_NOTE_ID", id });
  };

  const doubleClickHandler = (note) => {
    dispatch({ type: "SET_SELECTED_NOTE", note: { ...note } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_IS_EDITING", value: true });
    dispatch({
      type: "SET_NEW_NOTE",
      note: { ...state.newNote, [name]: value },
    });
  };

  const editHandler = (id) => {
    const noteToEdit = state.notes.find((note) => note.id === id);
    if (noteToEdit) {
      dispatch({ type: "SET_NEW_NOTE", note: { ...noteToEdit } });
      dispatch({ type: "SET_SELECTED_TAG", tag: noteToEdit.tag });
      dispatch({ type: "SET_IS_EDITING", value: true });
    }
  };

  const handleSave = (onAfterSave) => {
    if (
      !state.newNote.title.trim() ||
      !state.newNote.content.trim() ||
      !state.newNote?.tag?.trim()
    ) {
      return;
    }
    if (state.newNote.id) {
      axios
        .put(`/notes/${state.newNote.id}`, {
          title: state.newNote.title,
          content: state.newNote.content,
          tag: state.newNote.tag,
        })
        .then((res) => {
          const updatedNotes = state.notes.map((note) =>
            note.id === state.newNote.id ? res.data : note
          );
          dispatch({ type: "SET_NOTES", notes: updatedNotes });
          dispatch({ type: "SET_ACTIVE_NOTE_ID", id: res.data.id });
          dispatch({
            type: "SET_NEW_NOTE",
            note: { id: null, title: "", content: "", tag: "" },
          });
          dispatch({ type: "SET_IS_EDITING", value: false });
          dispatch({ type: "SET_SELECTED_TAG", tag: "" });
          if (onAfterSave) onAfterSave(res.data.id);
        })
        .catch((err) => {
          dispatch({
            type: "SET_ERROR",
            error: "Failed to update note. Please try again.",
          });
        });
    } else {
      axios
        .post("/notes", {
          title: state.newNote.title,
          content: state.newNote.content,
          tag: state.newNote.tag,
        })
        .then((res) => {
          dispatch({ type: "SET_NOTES", notes: [...state.notes, res.data] });
          dispatch({ type: "SET_ACTIVE_NOTE_ID", id: res.data.id });
          dispatch({
            type: "SET_NEW_NOTE",
            note: { title: "", content: "", tag: "" },
          });
          dispatch({ type: "SET_IS_EDITING", value: false });
          dispatch({ type: "SET_SELECTED_TAG", tag: "" });
          if (onAfterSave) onAfterSave(res.data.id);
        })
        .catch((err) => {
          dispatch({
            type: "SET_ERROR",
            error: "Failed to create note. Please try again.",
          });
        });
    }
  };

  const deleteHandler = (id) => {
    axios
      .delete(`/notes/${id}`)
      .then(() => {
        const updatedNotes = state.notes.filter((note) => note.id !== id);
        dispatch({ type: "SET_NOTES", notes: updatedNotes });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          error: "Failed to delete note. Please try again.",
        });
      });
  };

  // Filtering
  const filteredNotes = state.selectedTag
    ? state.notes.filter((note) => note.tag === state.selectedTag)
    : state.notes;

  return {
    ...state,
    handleTagChange,
    clickHandler,
    doubleClickHandler,
    handleInputChange,
    editHandler,
    handleSave,
    deleteHandler,
    filteredNotes,
    closeModal,
  };
}
