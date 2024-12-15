import { Link } from "react-router-dom"; // Importing Link for navigation
import { useState } from "react"; // Importing useState to manage the search input
import './Navbar.css'; // Importing custom CSS for the navbar styling

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu toggle

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle form submit (optional)
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle the search submit, e.g., redirect or filter tasks based on searchQuery
    console.log("Searching for:", searchQuery);
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link to="/">SmartServe</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">Task Management</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </form>
      </nav>
    </header>
  );
};

export default Navbar;
