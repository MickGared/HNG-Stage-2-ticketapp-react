import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="landing-container">
            <div className="decorative-circle circle1"></div>
            <div className="decorative-circle circle2"></div>
            <header className="hero">
            <h1 data-testid="test-hero-title">TicketApp</h1>
            <p data-testid="test-hero-description">Manage, track, and resolve your tickets effortlessly.
            </p>
            <div className="hero-buttons">
                <button data-testid="test-login-button" className="btn login-btn">Login</button>
                <button data-testid="test-get-started-button" className="btn get-started-btn">Get Started</button>
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
                    d="M0,64L48,90.7C96,117,192,171,288,197.3C384,224,480,224,576,197.3C672,171,768,117,864,112C960,107,1056,149,1152,181.3C1248,213,1344,235,1392,245.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
        <footer className="footer">
        <p>© {new Date().getFullYear()} <strong>TicketApp</strong> — Built by Mick</p>
        </footer>
        </div>
    );
}