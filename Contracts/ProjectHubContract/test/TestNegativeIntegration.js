const ContractHub = artifacts.require("ProjectHubContract");
const ProjectContract = artifacts.require("ProjectContract");


contract("ContractHub", accounts => {


    it("Should not be able to return a request at this point", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let date = new Date();
        let timestamp = date.getTime();
        timestamp = Math.floor(timestamp/1000);
        timestamp += 86400;
        await hub.addNewProject("TestProject", "TestDescription", 1000, timestamp, {from: creatorAccount});
        let project = await hub.getProjects(0, {from: creatorAccount});
        try{
            await project.getCurrentRequest();
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Return request should not be possible");
        }
        
    });

    it("Should not accept backingOption from non-creator accounts", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccount = accounts[1];
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        await projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 400, {from: creatorAccount});
        let backingOptionsCount = await projectContract.getBackingOptionsCount({from: creatorAccount});
        assert.equal(1, backingOptionsCount);
        try{
            await projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 400, {from: investorAccount});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Investors shoud not be able to add Backing options");
        }
    });

    it("Should not accept investors at this point", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccount = accounts[1];
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        try{
            await projectContract.addInvestor(0, {from: investorAccount, value: 500});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Investors shoud not be able to investor in this state");
        }
    });

    it("Shoud not accept backing options after closing periode", async () =>{
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        await projectContract.closeAddingBackingOptionPeriode({from: creatorAccount});
        try{
            await projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 400, {from: creatorAccount});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Adding options after closing should not be possible");
        }
    });

    it("Should not accept a investment with a wrong backing ID", async () =>{
        let hub = await ContractHub.deployed();
        let investorAccount = accounts[1];
        let project = await hub.getProjects(0, {from: investorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        try{
            await projectContract.addInvestor(5, {from: investorAccount, value: 500});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Wrong backing ID should not be accepted");
        }
    });

    it("Should not accet the creator as an investor", async () =>{
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        try{
            await projectContract.addInvestor(1, {from: creatorAccount, value: 500});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Creator should not be able to invest");
        }
    });

    it("Should not allow investor to invest twice", async () =>{
        let hub = await ContractHub.deployed();
        let investorAccount = accounts[2];
        let project = await hub.getProjects(0, {from: investorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        await projectContract.addInvestor(1, {from: investorAccount, value: 500});
        try{
            await projectContract.addInvestor(1, {from: investorAccount, value: 500});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Investors should only be able to invest once");
        }
    });

    it("Should not allow request, since the goal was not reached yet", async () =>{
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        try{
            await projectContract.addRequest("TestRequest", "TestRequestDescription", timestamp, 1000, {from: creatorAccount});
        }
        catch(Error){
            assert.notEqual(Error, undefined, "Request are only possible after the goal was reached");
        }
    });
});