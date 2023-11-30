// src/components/DepositForm.jsx
import React, { useState } from 'react';
import { getContract } from '../ethereum';
import contractInfo from '../contractinfo.json';

const DepositForm = () => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    if (!amount) return;
    const contract = getContract(contractInfo.address, contractInfo.abi);
    if (contract) {
      try {
        const transaction = await contract.deposit({ value: ethers.utils.parseEther(amount) });
        await transaction.wait();
        alert("Deposit successful!");
      } catch (error) {
        console.error("Error during deposit:", error);
        alert("Deposit failed!");
      }
    }
  };

  return (
    <div>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
};

export default DepositForm;
