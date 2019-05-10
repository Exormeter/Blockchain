pragma solidity ^0.5;


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

    }
}

