import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import WalletConnect from '../../components/WalletConnect';
import './home.css';
import HomeImage from '../../assets/Home.png';
import MobileImage from '../../assets/M_home.png';
import BackgroundImage from '../../assets/Background.png';
import SearchIcon from '../../assets/search icon.png';

const Home = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [name, setName] = useState('');
  
  // Load name from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }
  }, []);
  
  // Save name to localStorage when it changes
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    localStorage.setItem('userName', newName);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    backgroundImage: `url(${isConnected ? BackgroundImage : (isMobile ? MobileImage : HomeImage)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center 0',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    transition: 'background-image 0.5s ease-in-out'
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
      
      {isConnected && (
        <>
          <div className="search-icon-container">
            <img 
              src={SearchIcon} 
              alt="Search" 
              className="search-icon"
            />
          </div>
          <div className="name-input-container">
            <div className="input-label">Enter user name here</div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="name-input"
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;