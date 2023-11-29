// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract BlockchainPayPal is ReentrancyGuard, Ownable, Pausable {
    mapping(address => uint256) private balances;

    constructor(address initialOwner) Ownable(initialOwner) {
        // Additional constructor logic if necessary
    }

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function deposit() public payable whenNotPaused {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount; // State change before external call
        payable(msg.sender).transfer(amount); // External call after state change
    }

    function transfer(address to, uint256 amount)
        public
        nonReentrant
        whenNotPaused
    {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Cannot transfer to the zero address");

        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Administrative functions
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function emergencyWithdraw(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(address(this).balance >= amount, "Insufficient balance");
        payable(to).transfer(amount);
    }

    // Additional administrative functions as needed
}
