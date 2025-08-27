import React from 'react';
import './leaderboard.css';
import BackgroundImage from '../../assets/Background.png';

const Leaderboard = () => {
  // Sample leaderboard data - replace with your actual data
  const leaderboardData = [
    { rank: 1, name: 'Player 1', score: 1000 },
    { rank: 2, name: 'Player 2', score: 900 },
    { rank: 3, name: 'Player 3', score: 800 },
    // Add more players as needed
  ];

  return (
    <div 
      className="leaderboard-container"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="leaderboard-content">
        <h1>Leaderboard</h1>
        <div className="leaderboard-list">
          {leaderboardData.map((player) => (
            <div key={player.rank} className="leaderboard-item">
              <span>#{player.rank}</span>
              <span>{player.name}</span>
              <span>{player.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;