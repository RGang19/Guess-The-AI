import React from 'react';
import { useAccount } from 'wagmi';
import './profile.css';

const Profile = () => {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="profile-container">
        <h2>Please connect your wallet to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <div className="wallet-address">
          <span>Wallet Address:</span>
          <p>{address}</p>
        </div>
        {/* Add more profile information here as needed */}
      </div>
    </div>
  );
};

export default Profile;