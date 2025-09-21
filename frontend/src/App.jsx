import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Jobs from './pages/Jobs';
import Mentorship from './pages/Mentorship';
import Forums from './pages/Forums';
import Donations from './pages/Donations';
// import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/donations" element={<Donations />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
