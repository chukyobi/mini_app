import React from 'react'
import MainButton from './components/mainButton/MainButton';
import HelpButton from './components/helpButton/HelpButton';
import './scratchWin.css';

const ScratchwinPlay = () => {
    return (
        <div className="play-page">
          {!scratchCard ? (
            <div className="loading">LOADING...</div>
          ) : (
            <>
              <img
                src={require('../../assets/logo.png').default}
                className="logo-small"
                onClick={handleBack}
                alt="Logo"
              />
              <Card key={key} ref={cardRef} card={scratchCard} />
    
              <MainButton
                handleClick={handleNew}
                text="NEW"
                disabled={revealed !== 4}
              />
    
              <HelpButton />
              {modal && <Modal />}
    
              <div className="stats">
                <div>CARDS : {cards}</div>
                <div>
                  {coins} <img className="stats-coin" src={require('../../assets/coin.png').default} alt="Coin" />
                </div>
              </div>
            </>
          )}
        </div>
      );
}

export default ScratchwinPlay