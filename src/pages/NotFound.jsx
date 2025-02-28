import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '0 20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '20px', marginBottom: '30px' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '16px'
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
