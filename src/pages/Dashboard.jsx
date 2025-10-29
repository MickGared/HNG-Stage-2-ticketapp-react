import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

// 💅 Styles
const styles = {
  container: {
    maxWidth: "1440px",
    margin: "0 auto",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    background: "#f8f9fa",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.3s",
    textAlign: "center",
  },
  count: {
    fontSize: "28px",
    fontWeight: "700",
    marginTop: "10px",
  },
  actions: {
    textAlign: "center",
  },
  navButton: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
  },
  logoutButton: {
    marginLeft: "10px",
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
  },
  modeButton: {
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    marginTop: "auto",
    paddingTop: "40px",
    fontSize: "14px",
    opacity: "0.7",
  },
  };

export default function Dashboard() {
  const navigate = useNavigate();

  // 🔒 Protect route
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    if (!session) {
      alert("Your session has expired — please log in again.");
      navigate("/auth/login");
    }
  }, [navigate]);

  const [tickets, setTickets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Load tickets and dark mode preference
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("ticketapp_tickets")) || [];
    const savedDark = JSON.parse(localStorage.getItem("ticketapp_darkMode")) || false;
    setTickets(savedTickets);
    setDarkMode(savedDark);
  }, []);

  // 💡 Stats
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in_progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("ticketapp_darkMode", JSON.stringify(newMode));
  };

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode ? "#121212" : "#fff",
        color: darkMode ? "#e5e5e5" : "#000",
      }}
    >
      <header style={styles.header}>
        <h1>🎟️ Ticket Dashboard</h1>
        <div>
          <button onClick={toggleDarkMode} style={styles.modeButton}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <section style={styles.statsSection}>
        <div style={{ ...styles.statCard, borderLeft: "5px solid #007bff" }}>
          <h3>Total Tickets</h3>
          <p style={styles.count}>{total}</p>
        </div>

        <div style={{ ...styles.statCard, borderLeft: "5px solid green" }}>
          <h3>Open</h3>
          <p style={styles.count}>{open}</p>
        </div>

        <div style={{ ...styles.statCard, borderLeft: "5px solid orange" }}>
          <h3>In Progress</h3>
          <p style={styles.count}>{inProgress}</p>
        </div>

        <div style={{ ...styles.statCard, borderLeft: "5px solid gray" }}>
          <h3>Closed</h3>
          <p style={styles.count}>{closed}</p>
        </div>
      </section>

      <div style={styles.actions}>
        <button onClick={() => navigate("/tickets")} style={styles.navButton}>
          🧾 Manage Tickets
        </button>
      </div>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} TicketApp — Built by Mick.B</p>
</footer>
    </div>
  );

  };
