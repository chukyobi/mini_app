import React from 'react';
import scratch_image from "./assets/scratch-bonanza-game-graphic.jpg";

const Gaming = ({ userData, setCurrentPage }) => {

  const handlePlayClick = () => {
    setCurrentPage('scratch-win');
  };

  return (
    <div className='gaming-container'>
      <h2 className='game-header'>Gaming</h2>
      <div className='games-container'>
        <div className='game-layout'>
          <img src={scratch_image} alt="alpharand_coin" className="game-img" />
          <div className='play-tab'>
            <div className='tab-titles'>
              <p>Scratch & Win <br/><span className='small-text'>Crazy Art Games</span></p>
            </div>
            <button className='play-button' onClick={handlePlayClick}>Play</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gaming;
