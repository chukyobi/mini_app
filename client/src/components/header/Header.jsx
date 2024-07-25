import React from 'react';
import profile_image from '../assets/default-profile-img.svg';
import wallet_icon from '../assets/wallet-icon.svg';
import './header.css'; // Make sure to import the updated CSS file

const Header = ({userData}) => {
  return (
    <div className="header-container">
      <div className="nav">
        <div className="profile_section">
          <div className="profile_container">
            <img src={profile_image} alt="profile_image" className="profile" />
          </div>
          <div className="profile_details">
            <h2>{userData.firstname}</h2>
            <h3>{userData.username}</h3>
          </div>
        </div>
        <div className="wallet_container">
          <img src={wallet_icon} alt="wallet_icon" className="wallet_icon" />
          <span className="wallet_id">0xABC123...</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
