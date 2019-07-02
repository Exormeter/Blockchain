const ContractHub = artifacts.require("ProjectHubContract");
const ProjectContract = artifacts.require("ProjectContract");

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


contract("Second Request", accounts => {

    it("Pay the remaining funds back", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccountOne = accounts[1];
        let investorAccountTwo = accounts[2];
        let investorAccountThree = accounts[3];

        let date = new Date();
        let fundingClosingDate = date.getTime();

        currentDate = Math.floor(fundingClosingDate/1000);
        fundingClosingDate = currentDate + 5;
        projectClosingDate = (currentDate + 15);

        await hub.addNewProject("TestProject", "TestDescription", 1000000, fundingClosingDate, projectClosingDate, {from: creatorAccount});
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        await projectContract.addBackingOption("TestOption", "TestOptionDescription", 500000, 4, {from: creatorAccount});
        await projectContract.closeAddingBackingOptionPeriode({from: creatorAccount});

        await projectContract.addInvestor(1, {from: investorAccountOne, value: 500000});
        await projectContract.addInvestor(1, {from: investorAccountTwo, value: 500000});
        await projectContract.addInvestor(1, {from: investorAccountThree, value: 500000});

        await projectContract.addRequest("TestRequest", "TestRequestDescription", (currentDate+7), 1200000, {from: creatorAccount});

        await projectContract.voteForCurrentRequest(true, {from: investorAccountOne});
        await projectContract.voteForCurrentRequest(true, {from: investorAccountTwo});
        await projectContract.voteForCurrentRequest(true, {from: investorAccountThree});

        await projectContract.requestPayout({from: creatorAccount});

        await Sleep(2000);

        await projectContract.addRequest("TestRequest2", "TestRequestDescription2", (currentDate+11), 1200000, {from: creatorAccount});

        let request = await projectContract.getCurrentRequest();
        assert.equal(request[1], 'TestRequestDescription2');
    });
});
