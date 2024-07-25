import React from "react";
import "./dashboard_components.css";
import alpharand_coin from "./assets/alpharand-coin.svg";
import leaderboard_icon from "./assets/leaderboard-icon.svg";

const Home = ({
  userData,
  leaderboardData,
  isFarming,
  farmingProgress,
  farmedPoints,
  showClaimButton,
  showBalloons,
  startFarming,
  stopFarming,
  claimPoints
}) => {
  return (
    <div className="home-container">
      {showBalloons && (
        <div className="balloons-animation">
          {/* Replace with your confetti  animation */}
          🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈
        </div>
      )}
      <div className="farm-points-container">
        <span className="farm-points">{userData.farmedPoints} </span>
        <img src={alpharand_coin} alt="alpharand_coin" className="farm_coin" />
      </div>
      <h3 className="leader-title">Leaderboard</h3>
      <div className="leaderboard-container">
        {leaderboardData.map((profile, index) => (
          <div className="leaderboard-nav" key={index}>
            <div className="profile_tab">
              <div className="profile_tab_container">
                <img
                  src={leaderboard_icon}
                  alt="profile_image"
                  className="profile_tab_image"
                />
              </div>
              <div className="profile_tab_details">
                <h2>{profile.username}</h2>
                <span className="top-rated">Top Rated</span>
              </div>
            </div>
            <div className="points_cont">
              <span className="farm_tab_points">
                {profile.farmedPoints} PTS
              </span>
            </div>
          </div>
        ))}
      </div>
      {!isFarming && !showClaimButton && (
        <button className="farm-button" onClick={startFarming}>
          Farm Points
        </button>
      )}
      {isFarming && (
        <button className="farm-button farming-progress" onClick={stopFarming}>
          Farming in Progress ({farmingProgress} / 15) - Click to Stop
        </button>
      )}
      {showClaimButton && (
        <div>
          <button className="claim-button" onClick={claimPoints}>
            {farmedPoints} points farmed - Claim
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
