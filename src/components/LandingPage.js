import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
const authorName ="Mick B.";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
        {/*Decorative circles */}
            <div className="decorative-circle circle1"></div>
            <div className="decorative-circle circle2"></div>
    {/*Hero Section*/}
            <header className="hero">
            <h1 data-testid="test-hero-title">TicketApp</h1>
            <p data-testid="test-hero-description">Manage, track, and resolve your tickets effortlessly.
            </p>
            <div className="hero-buttons">
                <button data-testid="test-login-button" className="btn login-btn" onClick={() => navigate ("/login")}>
                Login</button>
                <button data-testid="test-get-started-button" className="btn get-started-btn"onClick={() => navigate("/signup")}>
                Get Started</button>
            </div>
            </header>

{/*Wave background*/}
            <svg
                className="wave"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                aria-hidden="true"
            >
                <path
                    fill="#0099ff"
                    fillOpacity="1"
                    d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
                ></path>
                </svg>

                {/* Features section */}
      <section className="features">
        <div className="feature-card">
          <h3>📊 Smart Dashboard</h3>
          <p>Get instant insights into ticket statuses and activity trends.</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast & Reliable</h3>
          <p>Track, update, and manage tickets in real-time without delays.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Sessions</h3>
          <p>Built with simulated authentication and session protection.</p>  
        </div>
        </section>

        {/*Footer */}
        <footer className="footer">
        <p>© {new Date().getFullYear()} <strong>TicketApp</strong> — Built by {Mick B.}</p>
        </footer>
        </div>
    );

}
