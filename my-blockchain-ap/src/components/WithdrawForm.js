// src/components/WithdrawForm.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../ethereum';
import contractInfo from '../contractinfo.json';

const WithdrawForm = () => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    if (!amount) return;
    const contract = getContract(contractInfo.address, contractInfo.abi);
    if (contract) {
      try {
        // Assuming the withdraw function in your contract takes the amount in wei
        const transaction = await contract.withdraw(ethers.utils.parseEther(amount));
        await transaction.wait();
        alert("Withdrawal successful!");
      } catch (error) {
        console.error("Error during withdrawal:", error);
        alert("Withdrawal failed!");
      }
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
};

export default WithdrawForm;
