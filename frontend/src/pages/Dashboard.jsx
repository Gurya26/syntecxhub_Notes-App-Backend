import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const response = await axios.get(
        "https://syntecxhub-notes-app-backend.onrender.com/api/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data);

    } catch (error) {

      toast.error("Failed to load notes");

    }
  };

  useEffect(() => {

    fetchNotes();

  }, []);

  // CREATE NOTE
  const createNote = async () => {

    if (!title || !content) {
      return toast.error("Fill all fields");
    }

    try {

      const response = await axios.post(
        "https://syntecxhub-notes-app-backend.onrender.com/api/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes([response.data, ...notes]);

      setTitle("");

      setContent("");

      toast.success("Note Created 🚀");

    } catch (error) {

      toast.error("Create Failed");

    }
  };

  // DELETE NOTE
  const deleteNote = async () => {

    try {

      await axios.delete(
        `https://syntecxhub-notes-app-backend.onrender.com/api/notes/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(
        notes.filter(
          (note) => note._id !== deleteId
        )
      );

      toast.success("Note Deleted ❌");

      setDeleteId(null);

    } catch (error) {

      toast.error("Delete Failed");

    }
  };

  // ARCHIVE NOTE
  const archiveNote = async (id) => {

    try {

      const response = await axios.put(
        `https://syntecxhub-notes-app-backend.onrender.com/api/notes/archive/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(
        notes.map((note) =>
          note._id === id
            ? response.data
            : note
        )
      );

      if (response.data.archived) {
        toast.success("Note Archived 📦");
      } else {
        toast.success("Note Unarchived ♻️");
      }

    } catch (error) {

      toast.error("Archive Failed");

    }
  };

  // EDIT NOTE
  const editNote = (note) => {

    setTitle(note.title);

    setContent(note.content);

    setEditId(note._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE NOTE
  const updateNote = async () => {

    try {

      const response = await axios.put(
        `https://syntecxhub-notes-app-backend.onrender.com/api/notes/${editId}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(
        notes.map((note) =>
          note._id === editId
            ? response.data
            : note
        )
      );

      setTitle("");

      setContent("");

      setEditId(null);

      toast.success("Note Updated ✏️");

    } catch (error) {

      toast.error("Update Failed");

    }
  };

  // FILTER NOTES
  const filteredNotes = notes.filter((note) => {

    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase());

    if (filter === "active") {
      return matchesSearch && !note.archived;
    }

    if (filter === "archived") {
      return matchesSearch && note.archived;
    }

    return matchesSearch;
  });

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };

  return (

    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <h1
          style={{
            color: "gold",
            fontSize: "60px",
          }}
        >
          Dashboard 😎
        </h1>

        <button
          onClick={logout}
          style={{
            background: "#ff2d55",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Logout
        </button>

      </div>

      {/* CREATE NOTE */}
      <div
        style={{
          background: "#07153a",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "30px",
        }}
      >

        <h2
          style={{
            fontSize: "40px",
            marginBottom: "20px",
          }}
        >
          {
            editId
              ? "Edit Note ✏️"
              : "Create Note 🚀"
          }
        </h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            background: "black",
            color: "white",
            fontSize: "18px",
          }}
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          rows="6"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "10px",
            border: "none",
            background: "black",
            color: "white",
            fontSize: "18px",
          }}
        />

        <button
          onClick={
            editId
              ? updateNote
              : createNote
          }
          style={{
            marginTop: "20px",
            background: "#00cc44",
            color: "white",
            border: "none",
            padding: "15px 25px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          {
            editId
              ? "Update Note"
              : "Create Note"
          }
        </button>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search Notes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "18px",
          borderRadius: "10px",
          border: "none",
          background: "#07153a",
          color: "white",
          fontSize: "18px",
        }}
      />

      {/* FILTER BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >

        <button onClick={() => setFilter("all")}>
          All Notes
        </button>

        <button onClick={() => setFilter("active")}>
          Active Notes
        </button>

        <button onClick={() => setFilter("archived")}>
          Archived Notes
        </button>

      </div>

      {/* SEARCH RESULT */}
      <div
        style={{
          marginTop: "25px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {
          filteredNotes.length > 0
            ? `✅ ${filteredNotes.length} Notes Found`
            : "❌ No Notes Found"
        }
      </div>

      {/* NOTES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          marginTop: "35px",
        }}
      >

        {filteredNotes.map((note) => (

          <div
            key={note._id}
            style={{
              background: note.archived
                ? "#7a3e00"
                : "#07153a",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "450px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >

            {/* TITLE */}
            <div
              style={{
                height: "90px",
                overflow: "hidden",
              }}
            >

              <h2
                style={{
                  color: "#00ff88",
                  fontSize: "34px",
                  lineHeight: "1.2",
                  wordBreak: "break-word",
                }}
              >
                {note.title}
              </h2>

            </div>

            {/* CONTENT */}
            <div
              style={{
                height: "170px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >

              <p
                style={{
                  fontSize: "22px",
                  lineHeight: "1.5",
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
                {note.content}
              </p>

            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >

              <button
                onClick={() => editNote(note)}
                style={{
                  background: "#2f80ed",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() =>
                  archiveNote(note._id)
                }
                style={{
                  background: "#e0a100",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                {
                  note.archived
                    ? "Unarchive"
                    : "Archive"
                }
              </button>

              <button
                onClick={() =>
                  setDeleteId(note._id)
                }
                style={{
                  background: "#ff2d55",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* DELETE MODAL */}
      {
        deleteId && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >

            <div
              style={{
                background: "#07153a",
                padding: "40px",
                borderRadius: "20px",
                width: "90%",
                maxWidth: "450px",
                textAlign: "center",
              }}
            >

              <h2
                style={{
                  color: "white",
                  marginBottom: "20px",
                  fontSize: "32px",
                }}
              >
                Delete Note ❌
              </h2>

              <p
                style={{
                  color: "white",
                  marginBottom: "30px",
                  fontSize: "20px",
                }}
              >
                Are you sure you want to delete this note?
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >

                <button
                  onClick={deleteNote}
                  style={{
                    background: "#ff2d55",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    setDeleteId(null)
                  }
                  style={{
                    background: "gray",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}

export default Dashboard;