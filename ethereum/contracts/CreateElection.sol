pragma solidity ^0.4.17;

import './election.sol';

contract CreateElection {

    address[] public deployedElections;

    function createElection(string memory _electionName) public returns(address) {
       Election newElection = new Election(_electionName);
        deployedElections.push(address(newElection));
        return address(newElection);
    }
    
    function getCreatedElections() public view returns(address[] memory) {
        return deployedElections;
    }
}