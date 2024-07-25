import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import profile_icon from '../assets/user.svg';
import './updateDetails.css';
import api from '../../api';

const UpdateDetails = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState('');

  useEffect(() => {
    // Fetch user data to populate fields
    const fetchUserData = async () => {
      try {
        const response = await api.get('/updateUser');
        setUsername(response.data.username || '');
        setFirstname(response.data.firstname || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Check for required fields
    if (!username) newErrors.username = 'Username is required';
    if (!firstname) newErrors.firstname = 'First Name is required';

    // Check length constraints
    if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (firstname.length < 1) newErrors.firstname = 'First Name must be at least 1 character';

    // Check for spaces in input values
    if (/\s/.test(username)) newErrors.username = 'Username cannot contain spaces';
    if (/\s/.test(firstname)) newErrors.firstname = 'First Name cannot contain spaces';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log("Sending data:", { username, firstname }); // Debugging line
      const response = await api.post('/updateUser/updateUsername', { username, firstname });
      console.log("Response data:", response.data); // Debugging line
      const { status, userId } = response.data;

      if (status === 'userupdated') {
        // Redirect only if user details were updated successfully
        navigate(`/welcome?userId=${userId}`);
      } else {
        setErrors({ api: 'Error updating user details. Please try again.' });
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      setErrors({ api: 'Error updating user details. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="update_container">
      <div className="logo-container">
        <img src={profile_icon} alt="Logo" className="update_logo" />
      </div>
      <h2 className="heading">Update details</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='align-left'>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="input"
          />
          {errors.firstname && <p className="error">{errors.firstname}</p>}
        </div>

        <div className="form-group">
          <label className='align-left'>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
          {usernameStatus && <p className={usernameStatus === 'Username is available' ? 'good' : 'error'}>{usernameStatus}</p>}
        </div>

        {errors.api && <p className="error">{errors.api}</p>}
        
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Proceed'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDetails;
