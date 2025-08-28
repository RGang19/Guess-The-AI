import React from 'react';
import { useAccount } from 'wagmi';
import './GamePage.css';

const GamePage = () => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="game-container">
        <h2>Please connect your wallet to play the game</h2>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2>Game Page</h2>
      {/* Add your game content here */}
      <div className="game-content">
        <p>Game content will be displayed here</p>
      </div>
    </div>
  );
};

export default GamePage;
