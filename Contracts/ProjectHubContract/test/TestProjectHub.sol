pragma solidity >=0.4.25 <0.6.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ProjectHubContract.sol";


contract TestProjectHub{
    struct Project{
        address owner;
        address projectAdress;
        string projectName;
        string projectDescription;
    }

    function testInitialHub() public{

        ProjectHubContract hub = new ProjectHubContract();
        uint hubProjects = 0;
        Assert.equal(hub.getProjectCount(), hubProjects, "Initial Projects should be 0");

    }

    function testAddProject() public{

        ProjectHubContract hub = new ProjectHubContract();
        hub.addNewProject("Test", "TestDescription");

        Assert.equal(hub.getProjectCount(), 1, "Projects should be 1");
    }

    function testProjectRetrival() public{
        address _owner;
        address _projectAdress;
        string memory _projectName;
        string memory _projectDescription;

        ProjectHubContract hub = new ProjectHubContract();
        hub.addNewProject("Test", "TestDescription");
        (_owner, _projectAdress, _projectName, _projectDescription) = hub.getProjects(0);


        Assert.equal(_projectName, "Test", "Name should be test");
    }

    function testProjectAddressRetrival() public{
        address _owner;
        address _projectAddress;
        string memory _projectName;
        string memory _projectDescription;

        ProjectHubContract hub = new ProjectHubContract();
        hub.addNewProject("Test", "TestDescription");
        (_owner, _projectAddress, _projectName, _projectDescription) = hub.getProjects(0);

        ProjectContract projectContract = ProjectContract(_projectAddress);
        Assert.equal(projectContract.getBackingOptionsCount(),0, "Name should be test");
    }

    function testAddBackingOption() public{
        address _owner;
        address _projectAddress;
        string memory _projectName;
        string memory _projectDescription;

        ProjectHubContract hub = new ProjectHubContract();
        hub.addNewProject("Test", "TestDescription");

        (_owner, _projectAddress, _projectName, _projectDescription) = hub.getProjects(0);

        ProjectContract projectContract = ProjectContract(_projectAddress);
        projectContract.addBackingOption("Option1", "Option1", 10, 10);

        (string memory title,,,) = projectContract.getBackingOption(0);

        Assert.equal(projectContract.getBackingOptionsCount(), 1, "BackingOptions should be 1");
        Assert.equal(title, "Option1", "Name should be Option1");


    }
}