// src/components/SplashScreen.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './splashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      api.get('/auth/authUser')
        .then(response => {
          const { status, userId, token } = response.data;

          if (status === 'existing_user') {
            navigate(`/welcome?userId=${userId}`);
          } else if (status === 'new_user') {
            navigate(`/follow-twitter?token=${token}`);
          }
        })
        .catch(error => {
          console.error('Error during user authentication:', error);
          setError('Error authenticating with Telegram. Please try again.');
        });
    }, 4000); // Splash screen lasts for 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      {error ? (
        <div className="error-container">
          <p>{error}</p>
        </div>
      ) : (
        <div className="splash-screen">
          <h3>AlphaRand</h3>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
