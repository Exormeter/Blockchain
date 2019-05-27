const ContractHub = artifacts.require("ProjectHubContract");
const ProjectContract = artifacts.require("ProjectContract");


contract("ContractHub", accounts => {

    it("Should return the right Contract Name", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        hub.addNewProject("TestProject", "TestDescription", {from: creatorAccount});
        let project = await hub.getProjects(0, {from: creatorAccount});

        assert.equal("TestProject", project[2]);
    });

    it("Should have the right Backing Option ID", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccountOne = accounts[1];
        hub.addNewProject("TestProject", "TestDescription", {from: creatorAccount});

        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 3, {from: creatorAccount});
        projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 3, {from: creatorAccount});
        let backingOption = await projectContract.getBackingOption(1, {from: investorAccountOne});

        assert.equal("TestOption", backingOption[0]);
        assert.equal("TestOptionDescription", backingOption[1]);
        assert.equal(500, backingOption[2]);
        assert.equal(3, backingOption[3]);
        assert.equal(2, backingOption[4]);
    });

    it("Should transfer 500 Wei to Contract", async () => {

        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccountOne = accounts[1];
        hub.addNewProject("TestProject", "TestDescription", {from: creatorAccount});

        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        projectContract.addBackingOption("TestOption", "TestOptionDescription", 500, 3, {from: creatorAccount});

        await projectContract.addInvestor(1, {from: investorAccountOne, value: 500});

        let currentContractBalance = await web3.eth.getBalance(project[1]);

        assert.equal(currentContractBalance, 500);

    });


})