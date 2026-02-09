
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Preferences.css";
import { auth, db } from "../../firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc,updateDoc } from "firebase/firestore";
import arrowIcon from "../../../assets/arrowblack.png";

import { useNavigate } from "react-router-dom";
const SignupPagePreferences = () => {
  const [csField, setCsField] = useState("");
  const [skillsOptions, setSkillsOptions] = useState([]);
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    cs_field: '',
    proficiency:'',
    skills:[],
    role:'',
    course_type:'',
    others:''

  });

  const handleChange = (e) => {
    console.log('We entered the handle change function')
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    console.log('cs_field form value is',prefs)
    setPrefs((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async (e) => {
    console.log('Entering on submit function')
    e.preventDefault();

    const uid = auth.currentUser?.uid;
    console.log(auth.currentUser.uid)
    if (!uid) {
      alert("You have not completed basic information yet");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);

      await setDoc(userRef, {
        cs_field: prefs.cs_field,
        proficiency:prefs.proficiency,
        skills:prefs.skills,
        role:prefs.role,
        course_type:prefs.course_type,
        others:prefs.others
      });

      alert("Preferences saved!");
      navigate("/tree");
      // Optionally navigate to dashboard or next step
    } catch (err) {
      console.error("Error updating preferences:", err);
      alert("Failed to save preferences.");
    }
  };


  const skillsMap = {
    swe: ["Python", "Java", "C++", "JavaScript", "SQL", "HTML/CSS"],
    "ml/ai": ["Python", "R", "TensorFlow", "Keras", "Pandas", "Numpy"],
    web: ["HTML/CSS", "JavaScript", "React", "Node.js", "SQL"],
    cybersec: ["Linux", "Python", "Network Security", "Ethical Hacking", "C++"],
    ds: ["Python", "R", "SQL", "Machine Learning", "Data Visualization", "Pandas"],
    game: ["C++", "Unity", "Unreal Engine", "C#", "Python"],
    mobile: ["Swift", "Kotlin", "Java", "Flutter", "React Native"],
  };

  const handleCsFieldChange = (e) => {
    const selectedField = e.target.value;
    setCsField(selectedField);
    setSkillsOptions(skillsMap[selectedField] || []);
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setPrefs((prev) => ({
      ...prev,
      [name]: val
    }));
  };
  const handleChangeskills = (e) => {
    const { name, type, checked, options, value } = e.target;
  
    let val;
    if (type === "checkbox") {
      val = checked;
    } else if (e.target.multiple) {
      // Extract all selected options for multiselect
      val = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
    } else {
      val = value;
    }
  
    setPrefs((prev) => ({
      ...prev,
      [name]: val
    }));
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="step-indicator">
          <div className="step">1. Basic Information</div>
          <div className="step active">2. Preferences</div>
        </div>
      </div>

      <div className="form-container">
        <h2>Preferences</h2>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="cs_field">CS field you are interested in</label>
          <select id="cs_field" name="cs_field" required onChange={handleCsFieldChange}>
            <option value="">Select an option</option>
            <option value="swe">Software Engineering</option>
            <option value="ml/ai">ML/AI</option>
            <option value="web">Web Development</option>
            <option value="cybersec">Cybersecurity</option>
            <option value="ds">Data Science</option>
            <option value="game">Game Development</option>
            <option value="mobile">Mobile Development</option>
          </select>

          <label htmlFor="proficiency">Rate your proficiency</label>
          <select id="proficiency" name="proficiency" onChange={handleChange} required>
            <option value="">Select an option</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label htmlFor="skills">Skills you know (hold CTRL/COMMAND and click for multi-select)</label>
          <select id="skills" name="skills" onChange={handleChangeskills}multiple required>
            <p>Select a CS field first before seeing skills</p>
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill.toLowerCase().replace(/ /g, "_")}>
                {skill}
              </option>
            ))}
          </select>

          <label htmlFor="role">What role are you looking for?</label>
          <select id="role" name="role" onChange={handleChange} required>
            <option value="">Select an option</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          <label htmlFor="course_type">Type of courses</label>
          <select id="course_type" name="course_type" onChange={handleChange} required>
            <option value="">Select an option</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="both">Both</option>
          </select>

          <label htmlFor="others">Any other comments that will help us customise courses for you!</label>
          <input
            type="text"
            id="others"
            name="others"
            onChange={handleChange}
            placeholder="Enter your preferences here..."
          />

          <button className="next-button" type="submit" >
            Submit <img src={arrowIcon} alt="arrow" />
          </button>
        </form>
      <p className="login-link">Access your account? <Link to="/">Login</Link></p>
      </div>
      
    </div>
  );
};

export default SignupPagePreferences;