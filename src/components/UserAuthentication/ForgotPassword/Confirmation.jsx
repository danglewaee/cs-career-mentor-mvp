import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

export default function Confirmation() {
  return (
    <div className="sent-container">
      <div className="sent-message">
        <h4>Password Updated Successfully!</h4>
        <Link to="/">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
