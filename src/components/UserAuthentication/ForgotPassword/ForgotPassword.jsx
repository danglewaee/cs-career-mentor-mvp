import React, { useState } from "react";
import "./ResetPassword.jsx";
import { auth } from "../../firebaseconfig.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePass = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Enter firebase auth and route to sent.jsx with an email sent to the user on their email
    try {
      await sendPasswordResetEmail(auth, email);
      navigate("/sent");
    } catch (err) {
      console.log(err);
      alert("There was an error sending the reset password email!");
    }
  };

  return (
    <div className="container">
      <div className="step-indicator"></div>

      <div className="form-container">
        <h2>Forgot Password?</h2>
        <form>
          <input
            onChange={handlePass}
            type="email"
            name="email"
            required
            placeholder="Enter your email"
          />
          <button type="submit" onClick={handleClick} className="next-button">
            Get Reset Password Link
          </button>
        </form>
      </div>
    </div>
  );
}
