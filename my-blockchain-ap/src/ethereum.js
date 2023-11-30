// src/ethereum.js
import { ethers } from 'ethers';

export const requestAccount = async () => {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
};

export const getProvider = () => {
  if (typeof window.ethereum !== 'undefined') {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return null;
};

export const getContract = (contractAddress, contractABI) => {
  const provider = getProvider();
  if (provider) {
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  return null;
};
