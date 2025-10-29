import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Tickets() {
  const navigate = useNavigate();

  // ✅ Safe JSON parser
  const safeParse = (value, fallback = null) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (err){
      return fallback;
    }
  };

  // 🔒 Protect route
  useEffect(() => {
    const session = safeParse(localStorage.getItem("ticketapp_session"));
    if (!session || !session.token) {
      alert("Your session has expired - Please log in again.");
      navigate("/auth/login");
    }
  }, [navigate]);

  // 🎫 States
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    priority: "Low",
    status: "open",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [editing, setEditing] = useState(false);

  // 🌙 Load saved tickets & dark mode
  useEffect(() => {
    const savedTickets = safeParse(localStorage.getItem("ticketapp_tickets"), []);
    const savedDark = safeParse(localStorage.getItem("ticketapp_darkMode"), false);
    setTickets(savedTickets);
    setDarkMode(savedDark);
  }, []);

  // 💾 Save tickets & dark mode
  useEffect(() => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets));
    localStorage.setItem("ticketapp_darkMode", JSON.stringify(darkMode));
  }, [tickets, darkMode]);

  // ✍️ Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFeedback({ message: "", type: "" });
  };

  // ➕ Add or update ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setFeedback({ message: "Title is required.", type: "error" });
      return;
    }

    if (!["open", "in_progress", "closed"].includes(form.status)) {
      setFeedback({ message: "Status must be 'open', 'in_progress', or 'closed'.", type: "error",
       });
      return;
    }
    if (editing) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === form.id
            ? { ...form, updatedAt: new Date().toLocaleString() }
            : t
        )
      );
      setFeedback({ message: "Ticket updated successfully!", type: "success" });
    } else {
      const newTicket = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
        updatedAt: null,
      };
      setTickets((prev) => [...prev, newTicket]);
      setFeedback({ message: "New ticket created!", type: "success" });
    }

    setForm({
      id: null,
      title: "",
      description: "",
      priority: "Low",
      status: "open",
    });
    setEditing(false);
  };

  // 🗑️ Delete ticket
  const deleteTicket = (id) => {
    if (window.confirm("Delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      setFeedback({ message: "Ticket deleted.", type: "success" });
    }
  };

  // ✏️ Edit ticket
  const editTicket = (ticket) => {
    setForm(ticket);
    setEditing(true);
    setFeedback({ message: "", type: "" });
  };

  // 🔁 Toggle ticket status
  const toggleStatus = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "open"
                  ? "in_progress"
                  : t.status === "in_progress"
                  ? "closed"
                  : "open",
              updatedAt: new Date().toLocaleString(),
            }
          : t
      )
    );
  };

  // 🌙 Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#f5f5f5" : "#000",
      }}
    >
      <div style={styles.header}>
        <h2 style={styles.title}>Manage Tickets 🎫</h2>
        <button onClick={toggleDarkMode} style={styles.darkModeButton}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ✅ Feedback message */}
      {feedback.message && (
        <p
          style={{
            color: feedback.type === "error" ? "red" : "green",
            marginBottom: "10px",
          }}
        >
          {feedback.message}
        </p>
      )}

      {/* 🎟️ Ticket form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Enter ticket title..."
          value={form.title}
          onChange={handleChange}
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Ticket description..."
          value={form.description}
          onChange={handleChange}
          style={{ ...styles.input, minHeight: "60px" }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={styles.select}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" style={styles.addButton}>
            {editing ? "Update" : "Add Ticket"}
          </button>
        </div>
      </form>

      {/* 🧾 Ticket list */}
      <div style={styles.list}>
        {tickets.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            
            No tickets yet. Add one above!
          </p>
        ) : (
          tickets.map((ticket) => (
            <li
              key={ticket.id}
              style={{
                ...styles.item,
                background: darkMode ? "#2c2c2c" : "#f9fafb",
                borderLeft:
                  ticket.priority === "High"
                    ? "5px solid red"
                    : ticket.priority === "Medium"
                    ? "5px solid orange"
                    : "5px solid green",
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: "4px" }}>{ticket.title}</h4>
                <p style={{ fontSize: "14px" }}>{ticket.description}</p>
                <small>
                  🕓 {ticket.updatedAt || ticket.createdAt} | 🔥{" "}
                  <strong>{ticket.priority}</strong> |{" "}
                  <span
                    style={{
                      color:
                        ticket.status === "closed"
                          ? "lightgreen"
                          : ticket.status === "in_progress"
                          ? "orange"
                          : "#888",
                    }}
                  >
                    {ticket.status}
                  </span>
                </small>
              </div>

              <div style={styles.actions}>
                <button onClick={() => toggleStatus(ticket.id)}>🔁</button>
                <button onClick={() => editTicket(ticket)}>✏️</button>
                <button onClick={() => deleteTicket(ticket.id)}>🗑️</button>
              </div>
            </li>
          ))
        )}
      </div>

      <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  addButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    borderBottom: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    gap: "6px",
  },
  backButton: {
    marginTop: "20px",
    background: "gray",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  darkModeButton: {
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};
