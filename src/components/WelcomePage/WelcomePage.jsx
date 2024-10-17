import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // استيراد CSS الخاص بالصفحة الترحيبية
import { Helmet } from 'react-helmet';

export default function WelcomePage() {
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center">
      <Helmet>
                <title>Bank system</title>
                <meta name="description" content="Your preferred account for all banking transactions" />
                
            </Helmet>
      <div className="text-center">
        <h1 className="mb-4">Welcome to Our Bank</h1>
        <p className="lead mb-5">Experience secure and modern banking services.</p>
        <div className="buttons">
          <Link to="/login" className="btn btn-primary px-5 py-0   custom-btn me-3" style={{borderRadius:"50px"}}>Login</Link>
          <Link to="/signup" className="btn btn-primary  px-5 py-0 custom-btn" style={{borderRadius:"50px"}}>Signup</Link>
        </div>
      </div>
    </div>
  )
}
