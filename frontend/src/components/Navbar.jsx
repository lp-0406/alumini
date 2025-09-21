import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
      <Link to="/profile" style={{ margin: '0 1rem', color: '#fff' }}>Profile</Link>
      <Link to="/events" style={{ margin: '0 1rem', color: '#fff' }}>Events</Link>
      <Link to="/jobs" style={{ margin: '0 1rem', color: '#fff' }}>Jobs</Link>
      <Link to="/mentorship" style={{ margin: '0 1rem', color: '#fff' }}>Mentorship</Link>
      <Link to="/forums" style={{ margin: '0 1rem', color: '#fff' }}>Forums</Link>
      <Link to="/donations" style={{ margin: '0 1rem', color: '#fff' }}>Donations</Link>
      <Link to="/admin" style={{ margin: '0 1rem', color: '#fff' }}>Admin</Link>
    </nav>
  );
};

export default Navbar;
