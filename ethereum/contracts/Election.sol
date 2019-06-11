pragma solidity ^0.4.17;


contract CreateElection {

    address[] public deployedElections;
    event contractCreated(string _contractName, address _contractAddress);

    function createElection(string memory _electionName) public {
       Election newElection = new Election(_electionName);
        deployedElections.push(address(newElection));
        emit contractCreated(_electionName, address(newElection));
    }
    
    
    function getCreatedElections() public view returns(address[] memory) {
        return deployedElections;
    }
}

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    string public electionDescription;

    mapping (address => bool) public voters;

    mapping (uint => Candidate) public candidates;

    uint public candidatesCount;
    event votedEvent (uint indexed _candidateId );

    constructor(string memory _description) public {
        electionDescription = _description;
        // addCandidate ("PMB");
        // addCandidate ("Atiku");
    
    }

    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate (candidatesCount, _name, 0);
    }
    // function addCandidate(string memory _name) private {
    //     candidatesCount++;
    //     candidates[candidatesCount] = Candidate (candidatesCount, _name, 0);

    // }

    function vote(uint _candidateId) public {
        require (!voters[msg.sender]);
        require (_candidateId > 0 && _candidateId <= candidatesCount);
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit votedEvent (_candidateId);
    }
}