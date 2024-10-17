import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // إضافة useNavigate
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // استخدام useNavigate

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById('settingsDropdown');
    const navbar = document.querySelector('.navbar');

    // Check if the click was outside the dropdown and the navbar
    if (dropdown && !dropdown.contains(event.target) && !navbar.contains(event.target)) {
      setDropdownOpen(false);
    }

    // Only close the menu if the click is outside of the navbar
    if (!navbar.contains(event.target) && menuOpen) {
      setMenuOpen(false);
    }
  };

  // الدالة التي تتعامل مع Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // حذف الـ token من localStorage
    navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/dashboard">Banking System</Link>
        <button className="navbar-toggler bg-light" type="button" onClick={toggleMenu} aria-expanded={menuOpen}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav py-2 mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`${getLinkClass("/dashboard")} text-light`} to="/dashboard">Your Bank Account</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/all-accounts")} text-light`} to="/all-accounts">All Bank Accounts</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/withdraw")} text-light`} to="/withdraw">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/deposit")} text-light`} to="/deposit">Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/transfer")} text-light`} to="/transfer">Transfer</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/transactions")} text-light`} to="/transactions">All Transactions</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/incoming-transactions")} text-light`} to="/incoming-transactions">Incoming Transactions</Link>
            </li>
          </ul>
          
          <div className="me-3">
            <button onClick={toggleDarkMode} className="btn btn-secondary" style={{borderRadius:"50px"}} >
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
              {darkMode ? ' Light Mode' : ' Dark Mode'}
            </button>
          </div>

          <div className="dropdown pt-1">
            <button style={{borderRadius:"50px"}} onClick={toggleDropdown} className="btn btn-secondary dropdown-toggle" id="settingsDropdown" aria-expanded={dropdownOpen}>
              <i className="fas fa-cog"></i>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                <li><Link className="dropdown-item" to="/profile">Profile Page</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li> {/* تعديل هنا */}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
