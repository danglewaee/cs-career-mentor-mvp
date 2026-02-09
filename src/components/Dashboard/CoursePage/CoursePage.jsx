import React, { useState, useEffect } from "react";
import "../../UserAuthentication/SignupPage/Signuppage.css";
import youtube from "./youtube.json";
import { Link, useSearchParams } from "react-router-dom";
import {db, auth} from "../../firebaseconfig";
import {doc, getDoc} from "firebase/firestore";
import "./CoursePage.css";


export default function CoursePage() {
  const [userInterests, setUserInterests] = useState(null);
  const API_KEY = "AIzaSyDa46WPKxFApM6RLnCoj3vbDTjKsKr51tA"; // Add environment variable API Key
  const [searchQuery, setSearchQuery] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPreferences = async () => {
      const user =auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInterests(docSnap.data());
          setSearchQuery(`${docSnap.data().cs_field} courses`);
        }
      }
    };
    fetchPreferences();
    const term = searchParams.get("search");
    if (term) {
      setSearchQuery(term);
      const autoSearch = async () => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${term}&key=${API_KEY}&type=video`
          );
          const data = await response.json();
          setVideoData(data.items);
        } catch (err) {
          console.error(err);
        }   };
      autoSearch();
    }
  }, [searchParams]);
  const handleSearch = async () => {
    if (!searchQuery) return;

    // Sample testing data from youtube.json
    // console.log('Search query is:', searchQuery);
    // setVideoData(youtube.items);

    // Actual Code for fetching youtube data
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEY}&type=video`
      );
      const data = await response.json();
      setVideoData(data.items);
    } catch (err) {
      console.error(err);
      setVideoData([{}, {}]);
    }
  };

  return (
    <div>
      <p>Search for Courses</p>
      <input
        type="text"
        placeholder="Search for Courses"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Submit</button>
<div className="video-results">
  {videoData && videoData.length > 0 ? (
    videoData.map((video, index) => (
      video.snippet ? (
        <div key={video.id?.videoId || index} className="video-card">
          <Link to={`https://www.youtube.com/watch?v=${video.id?.videoId}`}>
            <p>Video Title: {video.snippet.title}</p>
          </Link>
          <img
            src={video.snippet.thumbnails?.medium?.url}
            alt={video.snippet.title}
          />
        </div>
) : null
      ))
    ) : (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
      </p>
    )}
</div>
</div>
  );
}
