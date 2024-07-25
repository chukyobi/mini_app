import React, { useState, useEffect } from 'react';
import './followTwitter.css';
import x_icon from '../assets/x-icon.svg';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';

const FollowTwitter = () => {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTwitterUsername = async () => {
      try {
        const response = await axios.get('/api/twitter-username');
        setTwitterUsername(response.data.twitterUsername);
      } catch (error) {
        console.error('Error fetching Twitter username:', error);
      }
    };

    fetchTwitterUsername();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const followed = params.get('followed');

    if (token && followed) {
      api
        .get(`/auth/authTwitter`, { params: { token, followed } }) // Adjusted to send parameters
        .then((response) => {
          const { status, userId } = response.data;

          if (status === 'new_user') {
            navigate(`/update-details?userId=${userId}`);
          } else {
            // Handle any other cases if necessary
          }
        })
        .catch((error) => {
          console.error('Error authenticating with Twitter:', error);
          // Handle error, e.g., show an error message
        });
    }
  }, [location.search, navigate]);

  const handleCompleteTask = () => {
    // Open the modal
    setShowModal(true);
  };

  const handleFollow = () => {
    // Close the modal
    setShowModal(false);

    // Get current URL search parameters
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    // Construct the new URL with 'followed=true'
    const newParams = new URLSearchParams(location.search);
    newParams.set('followed', 'true');

    // Update the URL in the browser without refreshing the page
    window.history.replaceState(null, '', `${window.location.pathname}?${newParams.toString()}`);

    // Send the updated parameters to the backend
    api.get(`/auth/authTwitter`, { params: { token, followed: 'true' } })
      .then((response) => {
        const { status, userId } = response.data;

        if (status === 'new_user') {
          navigate(`/update-details?userId=${userId}`);
        } else {
          // Handle any other cases if necessary
        }
      })
      .catch((error) => {
        console.error('Error authenticating with Twitter:', error);
        // Handle error, e.g., show an error message
      });
  };

  const handleCancel = () => {
    // Close the modal without adding any parameters
    setShowModal(false);
  };

  return (
    <div className="follow_container">
      <div className="content">
        <div className="follow_icon">
          <img src={x_icon} alt="Logo" className="folow_logo" />
        </div>
        <h2>Follow our official X <br />handle</h2>
        <p>Complete this task to start farming points on the dashboard</p>
        <button className="complete-task-button" onClick={handleCompleteTask}>
          Complete task
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCancel}>X</button>
            <h2>Follow our Twitter account</h2>
            <div className="twitter-embed">
              <a 
                className="twitter-follow-button" 
                href={`https://twitter.com/${twitterUsername}?ref_src=twsrc%5Etfw`} 
                data-show-count="false" 
                data-size="large"
                data-show-screen-name="true">
                Follow @{twitterUsername}
              </a>
            </div>
            <button className="follow-button" onClick={handleFollow}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowTwitter;
