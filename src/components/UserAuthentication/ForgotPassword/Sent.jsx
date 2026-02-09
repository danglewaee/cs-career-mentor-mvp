import React from "react";
import "./ForgotPassword.css";

export default function Sent() {
  return (
    <div className="sent-container">
      <div className="sent-message">
        <h4>Email Sent!</h4>
        <p>Check your inbox for the link to reset your password.</p>
      </div>
    </div>
  );
}