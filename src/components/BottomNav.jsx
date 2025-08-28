import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect } from 'wagmi';
import HomeIcon from '../assets/Home-icon.png';
import LeaderboardIcon from '../assets/Leaderboard.png';
import ProfileIcon from '../assets/Profile.png';
import WalletIcon from '../assets/Wallet.png';
import '../components/BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Check if the click is not on any nav icon
        const navIcons = document.querySelectorAll('.nav-icon');
        const clickedOnNavIcon = Array.from(navIcons).some(icon => 
          icon.contains(event.target) || icon === event.target
        );
        
        if (!clickedOnNavIcon) {
          setShowWalletInfo(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (index) => {
    switch(index) {
      case 0: // First icon (Home)
        navigate('/game');
        setShowWalletInfo(false);
        break;
      case 0:
        setShowWalletInfo(false);
        navigate('/');
        break;
      case 1:
        setShowWalletInfo(false);
        navigate('/leaderboard');
        break;
      case 2:
        setShowWalletInfo(false);
        navigate('/profile');
        break;
      case 3:
        setShowWalletInfo(!showWalletInfo);
        break;
      default:
        break;
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletInfo(false);
    navigate('/');
  };

  if (!isConnected) return null;

  return (
    <div className="bottom-bar">
      <button className="nav-icon" onClick={() => handleNavClick(0)}>
        <img src={HomeIcon} alt="Home" className="icon" />
      </button>
      <button className="nav-icon" onClick={() => handleNavClick(1)}>
        <img src={LeaderboardIcon} alt="Leaderboard" className="icon" />
      </button>
      <button className="nav-icon" onClick={() => handleNavClick(2)}>
        <img src={ProfileIcon} alt="Profile" className="icon" />
      </button>
      <div className="wallet-icon-container" ref={popupRef}>
        <button 
          className={`nav-icon ${showWalletInfo ? 'active' : ''}`} 
          onClick={() => handleNavClick(3)}
        >
          <img src={WalletIcon} alt="Wallet" className="icon" />
        </button>
        {showWalletInfo && (
          <div className="wallet-info-popup">
            <div className="wallet-address">
              {`${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`}
            </div>
            <button className="disconnect-button" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
