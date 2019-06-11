var Election = artifacts.require("./election.sol");
var CreateElection = artifacts.require("./CreateElection.sol");

module.exports = function(deployer) {
  deployer.deploy(Election, 'Presidential Election')
  // .then(() => {
  deployer.deploy(CreateElection, 'Presidential Election');
  // })
};
