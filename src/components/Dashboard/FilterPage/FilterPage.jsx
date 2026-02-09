import React from 'react';
import './FilterPage.css'; // Make sure this CSS file exists and is imported
import { useState } from 'react';
import { RiCarouselView } from 'react-icons/ri';
import { Link } from "react-router-dom";


const StyledForm = () => {

  // const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');
  const [courses, setCourses] = useState([]);
  const[description, setdescription]=useState('')
 const[free,setfree]=useState('')

  const fetchCourses = async () => {
    // setLoading(true);
    let query='Python'
    const response = await fetch(`http://localhost:8080/api/scrape?q=${query}&level=${level}`);
    console.log('entered fetch courses atleast')
    const data = await response.json();
    if (Array.isArray(data)) {
      setCourses(data);
      console.log('data',data)
      // setLoading(false)
    } else {
      console.error("Unexpected data:", data);
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault(); // prevent page reload
    // console.log('Form submitted:', formData);
    console.log('level',level)
    console.log('descriptoion',description)
    console.log('free',free)

    fetchCourses()
    
    // You can also send this data to backend using fetch/axios
    // axios.post('/api/submit', formData)
  };

  return (
    <div>
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Customise your python course selection</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label className="form-label">What type of courses do you prefer?</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="courseType" value="Free" onChange={(e) => setfree(e.target.value)}/> Free
              </label>
              <label>
                <input type="radio" name="courseType" value="Paid" onChange={(e) => setfree(e.target.value)} /> Paid
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" >Level</label>
            <select className="form-select" onChange={(e) => setLevel(e.target.value)}>
              <option value="">Select an option</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Any other comments</label>
            <textarea onChange={(e) => setdescription(e.target.value)}
              className="form-textarea"
              placeholder="Your message..."
            ></textarea>
          </div>

          <div className="form-action">
          
           <Link to="/"><p> Go back to home page? </p></Link>
            <br />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>

      


    </div>
    <div className="course-cards">
        {courses.map((course, idx) => (
          <div className="course-card" key={idx}>
            <h3>{course.course_name}</h3>
            <p><strong>Level:</strong> {course.course_level}</p>
            <p><strong>Language:</strong> {course.course_language}</p>
            <p><strong>Provider:</strong> {course.course_provider}</p>
            <p><strong>Rating:</strong> {course.course_avg_rating}</p>
            <p><strong>Institution:</strong> {course.course_institution}</p>
            <p><strong>Subject:</strong> {course.course_subject}</p>
            <p><strong>Free:</strong> {String(course.course_is_free)}</p>
            <p><strong>Classroom:</strong> {String(course.is_classroom)}</p>
            <p><strong>Certificate:</strong> {String(course.course_certificate)}</p>
            <a href={course.link} target="_blank" rel="noreferrer" className="course-link">
              Visit Course
            </a>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default StyledForm;
