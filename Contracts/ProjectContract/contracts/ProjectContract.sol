pragma solidity ^0.5.0;

import "./Ownable.sol";
import "../../Libs/DateLib.sol";

contract ProjectContract is Ownable{

    string projectTitle;
    string projectDescription;
    BackingOption[] backingOptions;
    int backerOptionsID = 1;
    address[] investors;
    Request currentRequest;

    struct BackingOption{
        string optionTitle;
        string optionDescription;
        uint optionAmountEther;
        int optionAvailability;
        int id;
    }

    struct Request{
        string requestTitle;
        string requestDescription;
        uint256 valideUntil;
        uint amount;
    }

    constructor(address _owner, string memory _projectTitle, string memory _projectDescription) public
    {
        owner = _owner;
        projectTitle = _projectTitle;
        projectDescription = _projectDescription;
    }

    function addBackingOption(string memory _optionTitle, string memory _optionDescription,
    uint _optionAmountEther, int _optionAvailability) public onlyOwner
    {
        BackingOption memory backingOption = BackingOption(_optionTitle, _optionDescription, _optionAmountEther,
            _optionAvailability, backerOptionsID);
        backingOptions.push(backingOption);
        backerOptionsID++;
    }

    function getBackingOption(uint index) public view returns(string memory, string memory, uint, int)
    {
        if(index > backingOptions.length){
            return ("", "", 0, 0);
        }
        return (backingOptions[index].optionTitle, backingOptions[index].optionDescription,
            backingOptions[index].optionAmountEther, backingOptions[index].optionAvailability);
    }

    function addInvestor(int backingOptionID) public payable returns (bool)
    {
        uint  optionIndex;
        for (uint i = 0; i<backingOptions.length; i++){
            if(backingOptions[i].id == backingOptionID){
                optionIndex = i;
                break;
            }
        }

        //BackingOption mit übergebener ID wurde nicht gefunden
        if(backingOptions[optionIndex].id == 0){
            return false;
        }

        //Der gesendete Ether Amount entspricht nicht der gewählten BackingOption
        if(msg.value != backingOptions[optionIndex].optionAmountEther){
            return false;
        }

        //Die Option ist nicht mehr verfügbar
        if(backingOptions[optionIndex].optionAvailability <= 0){
            return false;
        }

        investors.push(msg.sender);
        backingOptions[optionIndex].optionAvailability--;
        
    }

    function addRequest(string memory _requestTitle, string memory _requestDescription,
    uint256 _valideUntil, uint _amount) public onlyOwner returns (bool)
    {
        //TDDO: Check if currentRequest is not null
        if(currentRequest.valideUntil < block.timestamp)
        {
            return false;
        }
        currentRequest = Request(_requestTitle, _requestDescription, _valideUntil, _amount);
        return true;
    }

     
}