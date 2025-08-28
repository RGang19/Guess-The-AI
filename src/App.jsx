import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

// Components
import Home from './screens/home/home';
import Leaderboard from './screens/leaderboard/leaderboard';
import Profile from './screens/profile/profile';
import GamePage from './screens/game/GamePage';
import BottomNav from './components/BottomNav';

// 0G Galileo Testnet configuration
const ogGalileoTestnet = {
  id: 16601,
  name: '0G Galileo Testnet',
  network: '0G-Galileo-Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'OG',
    symbol: 'OG',
  },
  rpcUrls: {
    public: { http: ['https://evmrpc-testnet.0g.ai'] },
    default: { http: ['https://evmrpc-testnet.0g.ai'] },
  },
  blockExplorers: {
    etherscan: { name: '0G Explorer', url: 'https://chainscan-galileo.0g.ai' },
    default: { name: '0G Explorer', url: 'https://chainscan-galileo.0g.ai' },
  },
  testnet: true,
};

// Configure chains & providers
const config = getDefaultConfig({
  appName: 'Guess The AI',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [ogGalileoTestnet, mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: false, // If your app uses server-side rendering, set this to true
});

// Create a client
const queryClient = new QueryClient();

// Layout component to wrap all pages with BottomNav
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <main className="main-content">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

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
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/leaderboard" element={
                <Layout>
                  <Leaderboard />
                </Layout>
              } />
              <Route path="/profile" element={
                <Layout>
                  <Profile />
                </Layout>
              } />
              <Route path="/game" element={
                <Layout>
                  <GamePage />
                </Layout>
              } />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;