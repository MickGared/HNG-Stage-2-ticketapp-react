import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Landing() {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <h1 className="logo">Ticketly</h1>
        <div>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn primary">Get Started</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <h2>Manage Your Tickets Effortlessly</h2>
          <p>
            Streamline support, track progress, and resolve issues faster — all in one unified workspace.
          </p>
          <Link to="/signup" className="cta-btn">Start Now</Link>
        </div>

        {/* Decorative circle */}
        <div className="circle-deco"></div>
        {/* Wavy SVG bottom */}
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f5f5f5" d="M0,64L40,58.7C80,53,160,43,240,74.7C320,107,400,181,480,181.3C560,181,640,107,720,80C800,53,880,75,960,80C1040,85,1120,75,1200,96C1280,117,1360,171,1400,197.3L1440,224L1440,320L0,320Z"></path>
        </svg>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Simple Interface</h3>
          <p>Focus on what matters — every ticket at your fingertips.</p>
        </div>
        <div className="feature-card">
          <h3>Real-Time Feedback</h3>
          <p>Validation, toasts, and updates that keep users in sync.</p>
        </div>
        <div className="feature-card">
          <h3>Consistent Design</h3>
          <p>Seamlessly unified across React, Vue, and Twig builds.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Ticketly — Built with ❤️ by {`<YourNameHere>`}</p>
      </footer>
    </div>
  );
}
