import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseconfig.js";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const query = new URLSearchParams(location.search);
  const oobCode = query.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      console.log("Invalid Link");
      return;
    }

    verifyPasswordResetCode(auth, oobCode).catch((err) => {
      console.error(err);
      alert("The link has either expired or is invalid");
    });
  }, [oobCode]);

  const handlePass = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await confirmPasswordReset(auth, oobCode, password);
      navigate("/confirmation");
    } catch (err) {
      console.error(err);
      alert("There was an error resetting your password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Change your Password</h2>
        <form>
          <input
            onChange={handlePass}
            type="password"
            name="password"
            required
            placeholder="Enter your new password"
          />
          <button type="submit" onClick={handleReset} className="next-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
