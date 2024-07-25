import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import default_image from '../assets/default-profile-img.svg';
import alpharand_coin from '../assets/alpharand-coin.svg';
import './welcomeUser.css';
import api from '../../api';

const Welcome = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [unclaimedPoints, setUnclaimedPoints] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const userId = query.get('userId');

        if (!userId) {
          setError('User ID not found');
          return;
        }

        const response = await api.get(`/welcome?userId=${userId}`);
        console.log(response.data.userData);
        setUserData(response.data.userData);

        // Determine if the user is new or existing
        setIsNewUser(response.data.isNewUser);

        // Check for unclaimed points in local storage for existing users
        if (!response.data.isNewUser) {
          const storedPoints = localStorage.getItem("unclaimedPoints");
          if (storedPoints) {
            setUnclaimedPoints(parseInt(storedPoints, 10));
          }
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please log in.');
        } else {
          setError('Error fetching user data. Please try again.');
        }
      }
    };

    fetchUserData();
  }, [location.search]);

  const handleContinue = () => {
    if (userData) {
      navigate(`/dashboard?userId=${userData.userId}`);
    }
  };

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="welcome_container fade-in">
      <div className="welcome_logo-container">
        <img src={default_image} alt="default_image" className="welcome_logo" />
      </div>
      <h2 className="welcome_heading">
        Welcome{isNewUser ? '' : ' '}
        <span style={{ color: '#00ff00' }}>Back</span>, @{userData.username}
      </h2>
      {isNewUser ? (
        <div className="points-container">
          <span className="description">You've just received</span>
          <div className="coin">
            <img src={alpharand_coin} alt="default_image" className="welcome_logo_" />
            <span className="points">{userData.farmedPoints}</span>
          </div>
          <span className="description">AlphaRand points</span>
        </div>
      ) : (
        unclaimedPoints > 0 ? (
          <div className="points-container">
            <span className="description">You have unclaimed</span>
            <div className="coin">
              <img src={alpharand_coin} alt="default_image" className="welcome_logo_" />
              <span className="points">{unclaimedPoints}</span>
            </div>
            <span className="description">AlphaRand points</span>
          </div>
        ) : (
          <div className="points-container">
            <span className="description">You have a total </span>
            <div className="coin">
              <img src={alpharand_coin} alt="default_image" className="welcome_logo_" />
              <span className="points">{userData.farmedPoints}</span>
            </div>
            <span className="description">AlphaRand points</span>
          </div>
        )
      )}
      <button className="welcome-button" onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default Welcome;
