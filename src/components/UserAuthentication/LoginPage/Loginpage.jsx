import React, { useState } from "react";
import "./Loginpage.css";
import googleIcon from "../../../assets/google.png";
import githubIcon from "../../../assets/github.png";
import { githubprovider, googleprovider } from "../../firebaseconfig";
import { Link } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth, db } from '../../firebaseconfig';
import { onAuthStateChanged,GoogleAuthProvider, signOut,signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

  const [usercreds, setusercreds] = useState({
    email: "",
    password: "",
  });

  const handleCreds = (e) => {
    const { name, value } = e.target;
    setusercreds((prevCreds) => ({
      ...prevCreds,
      [name]: value,
    }));
  };
  const handlegithubauth = async (e) => {
    console.log('github auth called successfully');
  
    try {
      const result = await signInWithPopup(auth, githubprovider);
      const user = result.user;
      console.log("Github login successful:", user.email);
      alert(`Github login successful: ${user.email}`);
    } catch (error) {
      console.error("Github login failed:", error.message);
      alert(`Github login failed: ${error.message}`);
    }
  }
  
  const handlegoogleauth=async(e)=>{
    

    signInWithPopup(auth, googleprovider)
      .then((result) => {
        const user = result.user;
        console.log("Google login successful:", user.email);
        alert('google login successful',user.email)
      })
      .catch((error) => {
        console.error("Google login failed:", error.message);
        alert('there was an error')
      });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
   
    // 
    // TODO: Integrate with Firebase or your own backend here

    signInWithEmailAndPassword(auth, usercreds.email, usercreds.password)
      .then((userCredential) => {
        console.log(userCredential)
        // Successful login
        const user = userCredential.user;
        console.log('Logged in as:', user.email);
        alert(`Welcome back, ${user.email}!`);
        navigate("/signup-pref");
        // Optionally redirect:
        // window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        console.error(error.code, error.message);
        alert(`Login Failed: ${error.message}`);
      });
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={usercreds.email}
              onChange={handleCreds}
              placeholder="Enter your email"
              required
            />
          </div>
          {/* this is working forgot password block revert to this if show hide password doesnt wortk */}
          {/* <div className="input-group">
            <input
              type="password"
              name="password"
              value={usercreds.password}
              onChange={handleCreds}
              placeholder="Enter your password"
              required
            />
          </div> */}

        <div className="input-group" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={usercreds.password}
            onChange={handleCreds}
            placeholder="Enter your password"
            required
            style={{ paddingRight: "2.5rem" }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer"
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
          <button type="submit" onSubmit="handleLogin">Login</button>
        </form>

        <div className="separator">
          <span>Or login using</span>
        </div>

        <div className="social-buttons">
        <img src={googleIcon} onClick={handlegoogleauth}alt="Login with Google" />
          <img src={githubIcon} onClick={handlegithubauth} alt="Login with GitHub" />
        </div>

        <div className="forgot-password">
          <Link className="forgot-password-link" to="/forgot-password">
            Forgot password
          </Link>
          <p className="login-link">
            Don't have an account? <Link to="/signup-basic">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;