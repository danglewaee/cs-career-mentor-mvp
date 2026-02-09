import LandingPage from './components/LandingPage/LandingPage.jsx';
import SignupPageBasic from './components/UserAuthentication/SignupPage/Signuppage.jsx'
import SignupPagePreferences from './components/UserAuthentication/PreferencesPage/Preferences.jsx'
import LoginPage from './components/UserAuthentication/LoginPage/Loginpage.jsx';
import { Routes, Route } from 'react-router-dom';
import ResetPassword from './components/UserAuthentication/ForgotPassword/ResetPassword.jsx'
import ForgotPassword from './components/UserAuthentication/ForgotPassword/ForgotPassword.jsx'
import Sent from './components/UserAuthentication/ForgotPassword/Sent.jsx'
import Confirmation from './components/UserAuthentication/ForgotPassword/Confirmation.jsx'
import CoursePage from './components/Dashboard/CoursePage/CoursePage.jsx'
import FilterPage from './components/Dashboard/FilterPage/FilterPage.jsx';
import RoadmapTree from './components/Dashboard/RoadmapPage/RoadmapPage.jsx';

function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup-basic" element={<SignupPageBasic/>} />
    <Route path="/signup-pref" element={<SignupPagePreferences/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/reset-password" element={<ResetPassword/>} />
    <Route path="/sent" element={<Sent/>} />
    <Route path="/confirmation" element={<Confirmation/>} />
    <Route path="/course-page" element={<CoursePage/>} />
    <Route path="/filter" element={<FilterPage/>} />
    <Route path="/tree" element={<RoadmapTree/>} />
    
      
    </Routes>
  );
}

export default App;