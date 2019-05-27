pragma solidity ^0.5;
pragma experimental ABIEncoderV2;

import "./ProjectContract.sol";


contract ProjectHubContract{

    Project[] projects;
    mapping(address => Project[]) projectsCreatedByFounder;
    mapping(address => Project[]) projectsBackedByInvestor;


    struct Project{
        address owner;
        address projectAdress;
        string projectName;
        string projectDescription;
    }


    function addNewProject(string memory projectName, string memory projectDescription) public returns (bool)
    {
        ProjectContract projectContract = new ProjectContract(msg.sender, projectName, projectDescription, this);
        Project memory project = Project(msg.sender, address(projectContract), projectName, projectDescription);
        projects.push(project);
        projectsCreatedByFounder[msg.sender].push(project);
    }

    function getProjectCount() public view returns (uint)
    {
        return projects.length;
    }

    function getProjects(uint projectIndex) public view returns (address owner,
                                                                address projectAdress,
                                                                string memory projectName,
                                                                string memory projectDescription)
    {
        require(projectIndex < projects.length, "Index is out of bounds");

        return (projects[projectIndex].owner,
                projects[projectIndex].projectAdress,
                projects[projectIndex].projectName,
                projects[projectIndex].projectDescription);
        //return projects;
    }
    
    function getProjectCountForFounder() public view returns (uint)
    {
        return projectsCreatedByFounder[msg.sender].length;
    }

    function getProjectByFounderForIndex(uint projectIndex) public view returns (address, address, string memory, string memory)
    {
        require(projectIndex < projectsCreatedByFounder[msg.sender].length, "Index is out of bounds");

        return (projectsCreatedByFounder[msg.sender][projectIndex].owner,
                projectsCreatedByFounder[msg.sender][projectIndex].projectAdress,
                projectsCreatedByFounder[msg.sender][projectIndex].projectName,
                projectsCreatedByFounder[msg.sender][projectIndex].projectDescription);
    }

    function getProjectCountForInvestor() public view returns (uint)
    {
        return projectsBackedByInvestor[msg.sender].length;
    }

    function getProjectByInvestorForIndex(uint projectIndex) public view returns (address, address, string memory, string memory)
    {
        require(projectIndex < projectsBackedByInvestor[msg.sender].length, "Index is out of bounds");

        return (projectsBackedByInvestor[msg.sender][projectIndex].owner,
                projectsBackedByInvestor[msg.sender][projectIndex].projectAdress,
                projectsBackedByInvestor[msg.sender][projectIndex].projectName,
                projectsBackedByInvestor[msg.sender][projectIndex].projectDescription);
    }

    function addProjectToInvestor(address investor, address _projectAddress, address _owner,
                    string memory _projectName, string memory _projectDescription) public
    {
        projectsBackedByInvestor[investor].push(Project(_owner, _projectAddress, _projectName, _projectDescription));
    }
}



