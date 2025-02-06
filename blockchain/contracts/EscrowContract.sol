// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowContract {
    address public client;
    address public freelancer;
    uint256 public paymentAmount;
    uint256 public deadline;
    bool public workSubmitted;
    bool public workVerified;
    bool public paymentReleased;
    uint256 public penaltyPercentage;

    event WorkSubmitted();
    event WorkVerified(bool verified);
    event PaymentReleased(uint256 amount);

    constructor(address _freelancer, uint256 _deadline, uint256 _penaltyPercentage) payable {
        client = msg.sender;
        freelancer = _freelancer;
        paymentAmount = msg.value;
        deadline = block.timestamp + _deadline;
        penaltyPercentage = _penaltyPercentage;
    }

    function submitWork() external {
        require(msg.sender == freelancer, "Only freelancer can submit work");
        require(!workSubmitted, "Work already submitted");
        workSubmitted = true;
        emit WorkSubmitted();
    }

    function verifyWork(bool verified) external {
        require(msg.sender == client, "Only client can verify work");
        require(workSubmitted, "Work not submitted yet");
        workVerified = verified;
        emit WorkVerified(verified);
    }

    function releasePayment() external {
        require(msg.sender == client, "Only client can release payment");
        require(workVerified, "Work not verified yet");
        require(!paymentReleased, "Payment already released");

        uint256 amountToRelease = paymentAmount;
        if (block.timestamp > deadline) {
            uint256 penalty = (paymentAmount * penaltyPercentage) / 100;
            amountToRelease -= penalty;
        }

        payable(freelancer).transfer(amountToRelease);
        paymentReleased = true;
        emit PaymentReleased(amountToRelease);
    }
}
