// src/components/WalletConnectButton.jsx
import React from 'react';
import { requestAccount } from '../ethereum';

const WalletConnectButton = () => {
  const handleConnectWallet = async () => {
    try {
      await requestAccount();
      alert("Wallet connected!");
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      alert("Failed to connect the wallet!");
    }
  };

  return (
    <button onClick={handleConnectWallet}>Connect Wallet</button>
  );
};

export default WalletConnectButton;
