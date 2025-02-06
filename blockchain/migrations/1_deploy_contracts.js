const EscrowContract = artifacts.require("EscrowContract");
const DAODisputeResolution = artifacts.require("DAODisputeResolution");

module.exports = function (deployer) {
    deployer.deploy(EscrowContract);
    deployer.deploy(DAODisputeResolution);
};