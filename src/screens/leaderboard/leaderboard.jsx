import React from 'react';
import './leaderboard.css';
import BackgroundImage from '../../assets/Background.png';
import LeaderboardLogo from '../../assets/Leaderboard-logo.png';

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
        <div className="leaderboard-logo-container">
          <img 
            src={LeaderboardLogo} 
            alt="Leaderboard" 
            className="leaderboard-logo"
          />
        </div>
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