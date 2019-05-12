pragma solidity ^0.5;

import "../../ProjectContract/contracts/ProjectContract.sol";


contract ProjectHubContract{

    Project[] projects;

    struct Project{
        address owner;
        address projectAdress;
        string projectName;
        string projectDescription;
    }


    function addNewProject(string memory projectName, string memory projectDescription) public returns (bool)
    {
        ProjectContract projectContract = new ProjectContract(msg.sender, projectName, projectDescription);
        Project memory project = Project(msg.sender, address(projectContract), projectName, projectDescription);
        projects.push(project);
    }
}

