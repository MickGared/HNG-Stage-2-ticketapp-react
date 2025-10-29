import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.username || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );
    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    setIsSubmitting(true);

    // Save new user
    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Create a mock session
    const sessionToken = btoa('${form.email}:${Date.now()}');
    localStorage.setItem(
      "ticketapp_session",
      JSON.stringify({ token: sessionToken, user: form.email, createdAt: new Date().toISOString() })
    );

    setSuccess("Signup successful! Redirecting...");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>✨ Join TicketApp</h2>
        <p style={styles.subtitle}>
          Welcome aboard! Let’s get you started with your first ticket adventure.
        </p>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" disabled={isSubmitting} style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.switch}>
          Already with us?{" "}
          <Link to="/auth/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>

      {/* Decorative Circles */}
      <div style={styles.circleOne}></div>
      <div style={styles.circleTwo}></div>
      <div style={styles.wave}></div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 40%, #90caf9 100%)",
    position: "relative",
    overflow: "hidden",
    animation: "fadeIn 0.8s ease-in-out",
  },
  card: {
    background: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "90%",
    zIndex: 10,
    textAlign: "center",
    transition: "transform 0.3s ease",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1e3a8a",
  },
  subtitle: {
    color: "#555",
    fontSize: "14px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    background: "#1e3a8a",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s ease",
  },
  switch: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#1e3a8a",
    fontWeight: "600",
    textDecoration: "none",
  },
  error: {
    color: "#ff4d4f",
    background: "#ffe6e6",
    padding: "8px",
    borderRadius: "8px",
  },
  success: {
    color: "#22c55e",
    background: "#dcfce7",
    padding: "8px",
    borderRadius: "8px",
  },
  circleOne: {
    position: "absolute",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "#90caf9",
    top: "10%",
    left: "5%",
    zIndex: 1,
    opacity: 0.5,
  },
  circleTwo: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "#1e3a8a",
    bottom: "-60px",
    right: "-60px",
    zIndex: 1,
    opacity: 0.3,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    background: "radial-gradient(circle at center, #90caf9 0%, transparent 70%)",
    zIndex: 1,
  },
};
