var ProjectHubContract = artifacts.require("ProjectHubContract");

    module.exports = function(deployer) {
        deployer.deploy(ProjectHubContract);
    };