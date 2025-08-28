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
        accountStatus="none"
        chainStatus="none"
        showNetworkModal={false}
      >
        {({ account, chain, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button 
                      onClick={openConnectModal} 
                      type="button"
                      className="connect-wallet-button"
                    >
                      Connect Wallet
                    </button>
                  );
                }
                return null;
              })()}
            </div>
          );
        }}
      </ConnectButton>
    </div>
  );
};

export default WalletConnect;
