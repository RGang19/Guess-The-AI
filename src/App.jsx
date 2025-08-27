import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';
import Home from './screens/home/home';
import Leaderboard from './screens/leaderboard/leaderboard';

// Configure chains & providers
const config = getDefaultConfig({
  appName: 'Guess The AI',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID, // Replace with your WalletConnect project ID
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
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