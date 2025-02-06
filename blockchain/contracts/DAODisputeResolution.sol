// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAODisputeResolution {
    struct Dispute {
        address freelancer;
        address client;
        string jobDescription;
        bool resolved;
        uint256 votesForFreelancer;
        uint256 votesForClient;
    }

    Dispute[] public disputes;
    mapping(address => bool) public members;

    modifier onlyMember() {
        require(members[msg.sender], "Only DAO members can vote");
        _;
    }

    function addMember(address member) external {
        members[member] = true;
    }

    function createDispute(address _client, string memory _jobDescription) external {
        disputes.push(Dispute({
            freelancer: msg.sender,
            client: _client,
            jobDescription: _jobDescription,
            resolved: false,
            votesForFreelancer: 0,
            votesForClient: 0
        }));
    }

    function vote(uint256 disputeId, bool voteForFreelancer) external onlyMember {
        require(!disputes[disputeId].resolved, "Dispute already resolved");
        if (voteForFreelancer) {
            disputes[disputeId].votesForFreelancer++;
        } else {
            disputes[disputeId].votesForClient++;
        }
    }

    function resolveDispute(uint256 disputeId) external {
        require(!disputes[disputeId].resolved, "Dispute already resolved");
        Dispute storage dispute = disputes[disputeId];
        if (dispute.votesForFreelancer > dispute.votesForClient) {
            // Release payment to freelancer
            payable(dispute.freelancer).transfer(address(this).balance);
        } else {
            // Refund payment to client
            payable(dispute.client).transfer(address(this).balance);
        }
        dispute.resolved = true;
    }
}