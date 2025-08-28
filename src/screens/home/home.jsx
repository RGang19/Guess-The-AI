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
  
  const navigateToGame = () => {
    if (name.trim() && isConnected) {
      localStorage.setItem('userName', name.trim());
      navigate('/game');
    }
  };

  // Save name to localStorage when it changes
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
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
            <div className="input-with-button">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    navigateToGame();
                  }
                }}
                className="name-input"
                maxLength={50}
                placeholder="Type your name"
                autoFocus
              />
              <button 
                className="enter-button" 
                onClick={() => name.trim() && navigateToGame()}
                disabled={!name.trim()}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default Home;