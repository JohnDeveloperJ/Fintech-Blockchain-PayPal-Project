// src/components/WithdrawForm.js
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
        // Convert the amount to wei
        const amountInWei = ethers.utils.parseEther(amount.toString());
        const transaction = await contract.withdraw(amountInWei);
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
