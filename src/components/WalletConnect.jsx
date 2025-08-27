import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import './WalletConnect.css';

const WalletConnect = () => {
  return (
    <div className="wallet-connect-container">
      <ConnectButton 
        label="Connect Wallet"
        showBalance={false}
        accountStatus="address"
        chainStatus="icon"
      />
    </div>
  );
};

export default WalletConnect;
