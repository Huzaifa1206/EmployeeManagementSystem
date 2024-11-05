import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css'; // Import styles

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    } else {
      const userInfo = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
      setUser(userInfo);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
      </div>
      <div className={styles.content}>
        {user ? (
          <div className={styles.userInfo}>
            <p>Welcome, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your role: {user.role}</p>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p className={styles.loading}>Loading...</p>
        )}
      </div>
    </div>
  );
}
