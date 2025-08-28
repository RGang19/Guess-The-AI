import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSwitchChain, useConfig } from 'wagmi';
import './WalletConnect.css';

const WalletConnect = () => {
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const config = useConfig();

  useEffect(() => {
    const switchToOgGalileo = async () => {
      if (isConnected) {
        try {
          await switchChain({ chainId: 16601 });
        } catch (error) {
          console.error('Failed to switch to 0G Galileo Testnet:', error);
        }
      }
    };

    switchToOgGalileo();
  }, [isConnected, switchChain]);

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
