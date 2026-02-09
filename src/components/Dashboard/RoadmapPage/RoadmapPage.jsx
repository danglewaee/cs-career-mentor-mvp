import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { roadmapData } from "./data/roadmapData";
import { Link } from "react-router-dom";
import "./RoadmapGrid.css"; // 

const RoadmapPage = () => {
  const [userPrefs, setUserPrefs] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserPrefs(docSnap.data()); // Đảm bảo không có chữ 'console.' ở đây
      }
    }
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  if (loading) return <div>Loading...</div>;

  const myPath = roadmapData[userPrefs?.cs_field] || [];

  return (
    <div className="roadmap-container">
      <h1>Roadmap for {userPrefs?.cs_field?.toUpperCase()}</h1>
      <div className="roadmap-grid">
{myPath.map((step, index) => (
  <div key={index} className="roadmap-card">
    <div className="step-tag">Stage {index + 1}</div>
    <h3>{step.stage}</h3>
    <p className="stage-desc">{step.description}</p>
    <ul className="skill-list">
      {step.topics.map((skill) => (
        <li key={skill} className="skill-item">
          <Link to={`/course-page?search=${skill}`} className="skill-link">
          {skill}
          </Link>
          </li>
      ))}
    </ul>
  </div>
))}
      </div>
    </div>
  );
};

export default RoadmapPage;