import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
   
    
    const handleLogin = (e) => {
        e.preventDefault();

    if (email === "demo@ticketapp.com" && password === "1234") {
    //Save session in localStorage
        localStorage.setItem("ticketapp_session", JSON.stringify ({token:"user123", createdAt: Date.now() })
    );
    navigate("/dashboard");
    } else {
        setError("Invalid email or password");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Ticket App Login</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <input type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={styles.input}
  required />
                <input type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={styles.input}
  required />
                {error && <p style={styles.error}>{error}</p>}
      <button type="submit" style={styles.button}>
        Login</button>
                </form>
        <p> Don't have an account?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/auth/signup")}
          >Sign up</span></p>
        </div>
    );
}

const styles = {
    container: {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "20px",
    textAlign: "center",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "22px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
  },
};

<footer className="footer">
  <p>Built by Mick. B</p>
</footer>
