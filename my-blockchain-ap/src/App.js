// src/App.js
import React from 'react';
import WalletConnectButton from './components/WalletConnectButton';
import DepositForm from './components/DepositForm';
import WithdrawForm from './components/WithdrawForm';

function App() {
  return (
    <div className="App">
      <h1>Blockchain Interaction Example</h1>
      <WalletConnectButton />
      <DepositForm />
      <WithdrawForm />
    </div>
  );
}

export default App;
