import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';

// 0G Galileo Testnet configuration
const ogGalileoTestnet = {
  id: 16601, // Replace with the actual chain ID for 0G Galileo Testnet
  name: '0G Galileo Testnet',
  network: '0G-Galileo-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'OG',
    symbol: 'OG',
  },
  rpcUrls: {
    public: { http: ['https://evmrpc-testnet.0g.ai'] }, // Replace with actual RPC URL
    default: { http: ['https://evmrpc-testnet.0g.ai'] }, // Replace with actual RPC URL
  },
  blockExplorers: {
    etherscan: { name: '0G Explorer', url: 'https://chainscan-galileo.0g.ai' }, // Replace with actual explorer URL
    default: { name: '0G Explorer', url: 'https://chainscan-galileo.0g.ai' }, // Replace with actual explorer URL
  },
  testnet: true,
};
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import Home from './screens/home/home';
import Leaderboard from './screens/leaderboard/leaderboard';

// Configure chains & providers
const config = getDefaultConfig({
  appName: 'Guess The AI',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [ogGalileoTestnet, mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: false, // If your app uses server-side rendering, set this to true
});

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;