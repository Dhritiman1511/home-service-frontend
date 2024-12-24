import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-white text-xl">HomeService</h1>
      <div className="space-x-4">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/services" className="text-white">Services</Link>
        <Link to="/login" className="text-white">Login</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
