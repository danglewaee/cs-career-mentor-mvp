import React, { useState } from "react";
import "./Signuppage.css"; //css file
import {Link} from "react-router-dom"; 
const PreferencesForm = () => {
  const [csField, setCsField] = useState("");
  const [skillsOptions, setSkillsOptions] = useState([]);

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
        <form method="post" action="/signup/preferences">
          <label htmlFor="cs-field">CS field you are interested in</label>
          <select id="cs-field" name="cs-field" required onChange={handleCsFieldChange}>
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
          <select id="proficiency" name="proficiency" required>
            <option value="">Select an option</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <label htmlFor="skills">Skills you know (press Ctrl)</label>
          <select id="skills" name="skills" multiple required>
            <option value="">Select an option</option>
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill.toLowerCase().replace(/ /g, "_")}>
                {skill}
              </option>
            ))}
          </select>

          <label htmlFor="role">What role are you looking for?</label>
          <select id="role" name="role" required>
            <option value="">Select an option</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          <label htmlFor="course-type">Type of courses</label>
          <select id="course-type" name="course-type" required>
            <option value="">Select an option</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="both">Both</option>
          </select>

          <label htmlFor="others">Any other Preferences</label>
          <input
            type="text"
            id="others"
            name="others"
            placeholder="Enter your preferences here..."
          />

          <button className="next-button" type="submit">
            Submit <img src="/Images/arrowblack.png" alt="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
