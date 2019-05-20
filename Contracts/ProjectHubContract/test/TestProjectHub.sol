pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ProjectHubContract.sol";


contract TestProjectHub{

    function testInitialHub() public{

        ProjectHubContract hub = new ProjectHubContract();
        uint hubProjects = 0;
        Assert.equal(hub.getProjectCount(), hubProjects, "Initial Projects should be 0");

    }
}