import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);

  // DELETE MODAL
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    fetchNotes();
  }, []);

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      setLoading(true);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // CREATE NOTE
  const createNote = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
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

      toast.success("Note Created 🚀");

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {
      toast.error("Failed ❌");
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

      toast.success("Note Deleted 🗑️");

      setShowDeleteModal(false);

      fetchNotes();

    } catch (error) {
      toast.error("Delete Failed ❌");
    }
  };

  // ARCHIVE / UNARCHIVE
  const toggleArchive = async (id, archived) => {
    try {
      await axios.put(
        `https://syntecxhub-notes-app-backend.onrender.com/api/notes/archive/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (archived) {
        toast.success("Note Unarchived ♻️");
      } else {
        toast.success("Note Archived 📦");
      }

      fetchNotes();

    } catch (error) {
      toast.error("Action Failed ❌");
    }
  };

  // EDIT NOTE
  const editNote = (note) => {
    setEditingId(note._id);

    setTitle(note.title);
    setContent(note.content);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE NOTE
  const updateNote = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://syntecxhub-notes-app-backend.onrender.com/api/notes/${editingId}`,
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

      toast.success("Note Updated ✏️");

      setEditingId(null);

      setTitle("");
      setContent("");

      fetchNotes();

    } catch (error) {
      toast.error("Update Failed ❌");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    toast.success("Logged Out 👋");

    navigate("/");
  };

  // SEARCH + FILTER
  const filteredNotes = notes.filter((note) => {

    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    if (filter === "active") {
      return matchesSearch && !note.archived;
    }

    if (filter === "archived") {
      return matchesSearch && note.archived;
    }

    return matchesSearch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        padding: "20px",
      }}
    >

      {/* DELETE MODAL */}
      {
        showDeleteModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
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
                maxWidth: "400px",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  color: "white",
                  marginBottom: "20px",
                }}
              >
                Delete Note? 🗑️
              </h1>

              <p
                style={{
                  color: "#ccc",
                  marginBottom: "30px",
                }}
              >
                Are you sure you want to delete this note?
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={deleteNote}
                  style={{
                    background: "#ff2d55",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Yes Delete
                </button>

                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  style={{
                    background: "#374151",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <h1
          style={{
            color: "#ffcc00",
            fontSize: "clamp(35px, 6vw, 60px)",
          }}
        >
          Dashboard 😎
        </h1>

        <button
          onClick={logout}
          style={{
            padding: "12px 25px",
            background: "#ff2d55",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* CREATE NOTE */}
      <form
        onSubmit={editingId ? updateNote : createNote}
        style={{
          background: "#07153a",
          padding: "25px",
          borderRadius: "20px",
          marginTop: "30px",
        }}
      >

        <h2
          style={{
            color: "white",
            fontSize: "clamp(28px, 5vw, 45px)",
            marginBottom: "20px",
          }}
        >
          {editingId ? "Edit Note ✏️" : "Create Note 🚀"}
        </h2>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "10px",
            background: "black",
            color: "white",
            fontSize: "18px",
            border: "none",
            outline: "none",
          }}
        />

        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "10px",
            background: "black",
            color: "white",
            fontSize: "18px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "14px 28px",
            background: "#00cc44",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {editingId ? "Update Note" : "Create Note"}
        </button>

      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search Notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "18px",
          marginTop: "30px",
          borderRadius: "10px",
          background: "#07153a",
          color: "white",
          fontSize: "18px",
          border: "none",
          outline: "none",
        }}
      />

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        {["all", "active", "archived"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            style={{
              padding: "12px 20px",
              background:
                item === "all"
                  ? "#374151"
                  : item === "active"
                  ? "#00b33c"
                  : "#d18b00",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {item === "all"
              ? "All Notes"
              : item === "active"
              ? "Active Notes"
              : "Archived Notes"}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {
        loading ? (

          <h2
            style={{
              color: "white",
              textAlign: "center",
              marginTop: "50px",
              fontSize: "35px",
            }}
          >
            Loading Notes... 🚀
          </h2>

        ) : filteredNotes.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              marginTop: "70px",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "clamp(35px, 6vw, 55px)",
              }}
            >
              No Notes Found 😔
            </h1>

            <p
              style={{
                color: "#aaa",
                fontSize: "22px",
                marginTop: "10px",
              }}
            >
              Create your first note 🚀
            </p>
          </div>

        ) : (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            {
              filteredNotes.map((note) => (
                <div
                  key={note._id}
                  style={{
                    background: note.archived
                      ? "#7a3e00"
                      : "#07153a",
                    padding: "25px",
                    borderRadius: "20px",
                  }}
                >
                  <h2
                    style={{
                      color: "#00ff88",
                      fontSize: "32px",
                      wordBreak: "break-word",
                    }}
                  >
                    {note.title}
                  </h2>

                  <p
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginTop: "10px",
                      wordBreak: "break-word",
                    }}
                  >
                    {note.content}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      onClick={() => editNote(note)}
                      style={{
                        background: "#2d7fff",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleArchive(
                          note._id,
                          note.archived
                        )
                      }
                      style={{
                        background: "#ffb300",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      {
                        note.archived
                          ? "♻️ Unarchive"
                          : "Archive"
                      }
                    </button>

                    <button
                      onClick={() => {
                        setDeleteId(note._id);
                        setShowDeleteModal(true);
                      }}
                      style={{
                        background: "#ff2d55",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

        )
      }

    </div>
  );
}

export default Dashboard;