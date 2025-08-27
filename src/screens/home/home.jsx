import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletConnect from '../../components/WalletConnect';
import './home.css';
import HomeImage from '../../assets/Home.png';
import MobileImage from '../../assets/M_home.png';

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${isMobile ? MobileImage : HomeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 0',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  };

  return (
    <div 
      className="home-container"
      style={containerStyle}
    >
      <div className="top-buttons">
        <button 
          onClick={() => navigate('/leaderboard')}
          className="leaderboard-button"
        >
          Leaderboard
        </button>
        <WalletConnect />
      </div>
    </div>
  );
};

export default Home;