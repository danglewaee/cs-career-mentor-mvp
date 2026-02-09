import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './Signuppage.css';
import { auth, db } from '../../firebaseconfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import arrowIcon from '../../../assets/arrowblack.png';
import googleIcon from '../../../assets/google.png';
import githubIcon from '../../../assets/github.png';
import { useNavigate } from 'react-router-dom';

const SignupPageBasic = () => {
  const [usercreds, setusercreds] = useState({
    email: '',
    password: '',
    confirmpassword: '',
    firstname: '',
    lastname: '',
    dob: '',
    gender: '' // Initialize gender as empty string
  });

  const navigate = useNavigate();

  // Updated handler for all inputs
  const handlecreds = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For radio buttons, use the value if checked, otherwise keep current value
    const newValue = type === 'radio' ? (checked ? value : usercreds[name]) : value;
    
    setusercreds({
      ...usercreds,
      [name]: newValue
    });
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    
    if (!db) {
      console.error("Firestore not initialized!");
      alert("Database error. Please try again later.");
      return;
    }

    if (usercreds.password !== usercreds.confirmpassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        usercreds.email,
        usercreds.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        first_name: usercreds.firstname,
        last_name: usercreds.lastname,
        email: usercreds.email,
        password:usercreds.password,
        dob: usercreds.dob,
        gender: usercreds.gender, // Now properly saved
        createdAt: new Date()
      });
      navigate('/signup-pref');
    } catch (error) {
      console.error("Full error:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  return (
        <div className="page-wrapper">
          <div className="container">
            <div className="sidebar">
              <div className="step-indicator">
                  <div className="step active">1. Basic Information</div>
            
            <div className="step">2. Preferences</div>
          </div>
          </div>

          <div className="form-container">
          <h2>Create your account</h2>
          <form onSubmit={handlesignup}>
            {/* have remoeved the required for testing purposes, re add it incase i forget to put it  */}
            <input onChange={handlecreds} type="email" name='email' required placeholder="Email address" />
            <input onChange={handlecreds} type="password" name='password' required placeholder="Password" />
            <input onChange={handlecreds} type="password" name='confirmpassword' required placeholder="Confirm your Password" />
            <input onChange={handlecreds} type="text" name='firstname' required placeholder="First Name" />
            <input onChange={handlecreds} type="text" name='lastname' required placeholder="Last Name" />
            <input onChange={handlecreds} type="date" name='dob' required placeholder="Date of birth" />

       
            <div className="gender-options">
            <label style={{ display: 'inline-flex', alignItems: 'center', marginRight: '1rem' }}>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handlecreds}
                checked={usercreds.gender === 'Male'}
                style={{ marginRight: '0.25rem' }}
              />
              Male
            </label>

            {/* Female */}
            <label style={{ display: 'inline-flex', alignItems: 'center' }}>
            <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handlecreds}
            checked={usercreds.gender === 'Female'}
            style={{ marginRight: '0.25rem' }}
              />
              Female
                  </label>

                    </div>

                    <button type="submit"  className="next-button">
                    
                      Next <img src={arrowIcon} alt="arrow" />
                    </button>
                    <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
                  </form>
                </div>
              </div>
            </div>
          );
        };

export default SignupPageBasic;