var CreateElection = artifacts.require('./CreateElection.sol');


contract('CreateElection', (accounts) => {
    it('should initialize createElection', () => {
        return CreateElection.deployed().then((instance) => {
           instance.createElection('Lagos State House of Assembly');
           return instance;
        }).then((instance) => {
            return instance.getCreatedElections();
        }).then((elections) => {
            const count = elections.length;
            assert.equal(count,1);
            assert.ok(elections[0]);
        });
    });
})