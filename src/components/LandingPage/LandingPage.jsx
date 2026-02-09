import React from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <nav className="lp-navbar">
        <div className="lp-logo">
           <span className="logo-icon">🔸</span> CS Career Mentor
        </div>
        <div className="nav-links">
          <button className="lp-login-btn" onClick={() => navigate("/login")}>Login</button>
        </div>
      </nav>

      <header className="lp-hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="typing-title">
              Here comes <br />
              <span className="orange-text">
                <Typewriter
                  options={{
                    strings: ['CS Career Mentor'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>
            <p className="hero-subtext">
              Your personalized guide to SWE, ML/AI, and more.
            </p>
            <button className="lp-cta-btn" onClick={() => navigate("/login")}>
              Get Started →
            </button>
          </div>

          <div className="hero-visual">

          </div>
        </div>
      </header>
    </div>
  );
}