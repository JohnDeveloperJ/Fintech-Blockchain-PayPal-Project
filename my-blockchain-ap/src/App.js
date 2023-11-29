import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractInfo from './contractInfo.json';

const MyContractComponent = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);

                    setProvider(provider);
                    setSigner(signer);
                    setContract(contract);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.log('Ethereum object not found, install MetaMask.');
            }
        };

        init();
    }, []);

    // Add functions to interact with the contract here

    return (
        <div>
            <h1>My Blockchain App</h1>
            {/* UI components to interact with the contract */}
        </div>
    );
};

export default MyContractComponent;
