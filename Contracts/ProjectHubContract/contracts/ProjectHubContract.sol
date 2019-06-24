pragma solidity ^0.5;

import "./ProjectContract.sol";

/**
 * @title ProjectHubContract
 * @author Nils Kirchhof
 * @notice The ProjectHubContracts acts as an hub for all other ProjectContracts that are concluded
 * It saves the addresses of these contracts, as well as the creators and investors that have payed
 * Ethereum to be part of the project
 */

contract ProjectHubContract{

    Project[] projects;
    mapping(address => Project[]) projectsCreatedByFounder;
    mapping(address => Project[]) projectsBackedByInvestor;


    struct Project{
        address owner;
        address payable projectAdress;
        string projectName;
        string projectDescription;
        uint goal;
        uint fundingCloseDate;
    }

    event CreatedProject(
        address owner,
        address payable projectAdress,
        string projectName,
        string projectDescription,
        uint goal,
        uint fundingCloseDate
    );


    /**
    * @notice This function add a new projectContract to the ProjectHubContract. The caller address becomes
    * automaticly the owner of the new ProjectContract. The new ProjectContract is then added to the list
    * of ProjectContracts inside the ProjectHubContract.
    * @param projectName The name of the new ProjectContract
    * @param projectDescription The description of the new ProjectContract
    * @param fundingGoal The goal for the funding campain in Wei
    * @param fundingCloseDate The date until the goal needs to be reached
    * @return Returns true when the new ProjectContract was successfully created
    */
    function addNewProject(string memory projectName, string memory projectDescription, uint fundingGoal,
                            uint fundingCloseDate) public
    {
        require(fundingCloseDate > block.timestamp, "The given date is in the past");
        
        ProjectContract projectContract = new ProjectContract(msg.sender, projectName, projectDescription, fundingGoal, fundingCloseDate, this);
        Project memory project = Project(msg.sender, address(projectContract), projectName, projectDescription, fundingGoal, fundingCloseDate);
        projects.push(project);
        projectsCreatedByFounder[msg.sender].push(project);
        emit CreatedProject(
            msg.sender,
            address(projectContract),
            projectName,
            projectDescription,
            fundingGoal,
            fundingCloseDate
        );
    }

    /**
    * @notice This function returns the number of ProjectsContracts inside the Hub.
    * @return Number of ProjectContracts
    */
    function getProjectCount() public view returns (uint)
    {
        return projects.length;
    }

    /**
    * @notice This function returns a specific ProjectContract, given an index. It is used in
    * conjunction with getProjectCount() to retrive all avaiable ProjectContracs. It throws
    * exception if the index if larger then the list size.
    * @param projectIndex Index of the ProjectContract
    * @return Address of the ProjectContract owner
    * @return Address of the ProjectContract
    * @return Name of ProjectContract
    * @return Description of ProjectContract
    * @return Funding goal
    * @return Funding closeing Date
    */
    function getProjects(uint projectIndex) public view returns (address owner,
                                                                address payable projectAdress,
                                                                string memory projectName,
                                                                string memory projectDescription,
                                                                uint goal,
                                                                uint fundigCloseDate)
    {
        require(projectIndex < projects.length, "Index is out of bounds");

        return (projects[projectIndex].owner,
                projects[projectIndex].projectAdress,
                projects[projectIndex].projectName,
                projects[projectIndex].projectDescription,
                projects[projectIndex].goal,
                projects[projectIndex].fundingCloseDate);
    }

    /**
    * @notice This function return the number of ProjectContracts the caller owns.
    * @return Number of ProjectContracts owned by caller
    */
    function getProjectCountForFounder() public view returns (uint)
    {
        return projectsCreatedByFounder[msg.sender].length;
    }

    /**
    * @notice This function returns a specific ProjectContract that is owner by caller,
    * given an index. It is used in conjunction with getProjectCountForFounder() to retrive
    * all avaiable ProjectContracs owned by caller. It throws
    * exception if the index if larger then the list size.
    * @param projectIndex Index of the ProjectContract
    * @return Address of the ProjectContract owner
    * @return Address of the ProjectContract
    * @return Name of ProjectContract
    * @return Description of ProjectContract
    * @return Funding goal
    * @return Funding closeing Date
    */
    function getProjectByFounderForIndex(uint projectIndex) public view returns (address, address, string memory, string memory, uint, uint)
    {
        require(projectIndex < projectsCreatedByFounder[msg.sender].length, "Index is out of bounds");

        return (projectsCreatedByFounder[msg.sender][projectIndex].owner,
                projectsCreatedByFounder[msg.sender][projectIndex].projectAdress,
                projectsCreatedByFounder[msg.sender][projectIndex].projectName,
                projectsCreatedByFounder[msg.sender][projectIndex].projectDescription,
                projectsCreatedByFounder[msg.sender][projectIndex].goal,
                projectsCreatedByFounder[msg.sender][projectIndex].fundingCloseDate);
    }

    /**
    * @notice This function return the number of ProjectContracts the caller has invested in.
    * @return Number of ProjectContracts invested in by caller
    */
    function getProjectCountForInvestor() public view returns (uint)
    {
        return projectsBackedByInvestor[msg.sender].length;
    }

    /**
    * @notice This function returns a specific ProjectContract that is invested in by caller,
    * given an index. It is used in conjunction with getProjectCountForInvestor() to retrive
    * all avaiable ProjectContracs invested in by caller. It throws
    * exception if the index if larger then the list size.
    * @param projectIndex Index of the ProjectContract
    * @return Address of the ProjectContract owner
    * @return Address of the ProjectContract
    * @return Name of ProjectContract
    * @return Description of ProjectContract
    * @return Funding goal
    * @return Funding closeing Date
    */
    function getProjectByInvestorForIndex(uint projectIndex) public view returns (address, address, string memory, string memory, uint, uint)
    {
        require(projectIndex < projectsBackedByInvestor[msg.sender].length, "Index is out of bounds");

        return (projectsBackedByInvestor[msg.sender][projectIndex].owner,
                projectsBackedByInvestor[msg.sender][projectIndex].projectAdress,
                projectsBackedByInvestor[msg.sender][projectIndex].projectName,
                projectsBackedByInvestor[msg.sender][projectIndex].projectDescription,
                projectsBackedByInvestor[msg.sender][projectIndex].goal,
                projectsBackedByInvestor[msg.sender][projectIndex].fundingCloseDate);
    }

    /**
    * @notice This function is only used internally by the ProjectContract to inform the
    * ProjectHubContract that a new investor has been added to a ProjectContract
    * @param investor The address of the new investor
    * @param _projectAddress The address of the contract the investor has invested in
    * @param _owner The address of the owner of the ProjectContract the new investor has invested in
    * @param _projectName The Name of the ProjectContract the new investor has invested in
    * @param _projectDescription The Description of the ProjectContract the new investor has invested in
    * @param _goal The goal in Wei for the ProjectContract
    * @param _fundingCloseDate The date until the funding closes
    */
    function addProjectToInvestor(address investor, address payable _projectAddress, address _owner,
                    string memory _projectName, string memory _projectDescription, uint _goal, uint _fundingCloseDate) public
    {
        projectsBackedByInvestor[investor].push(Project(_owner, _projectAddress, _projectName, _projectDescription, _goal, _fundingCloseDate));
    }
}



