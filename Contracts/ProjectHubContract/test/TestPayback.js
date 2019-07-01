const ContractHub = artifacts.require("ProjectHubContract");
const ProjectContract = artifacts.require("ProjectContract");

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}


contract("Payback", accounts => {

    it("Pay the remaining funds back", async () => {
        let hub = await ContractHub.deployed();
        let creatorAccount = accounts[0];
        let investorAccountOne = accounts[1];
        let investorAccountTwo = accounts[2];
        let investorAccountThree = accounts[3];

        


        let date = new Date();
        let fundingClosingDate = date.getTime();

        fundingClosingDate = Math.floor(fundingClosingDate/1000);
        fundingClosingDate += 5;
        projectClosingDate = (fundingClosingDate + 150);

        await hub.addNewProject("TestProject", "TestDescription", 100000000, fundingClosingDate, projectClosingDate, {from: creatorAccount});
        let project = await hub.getProjects(0, {from: creatorAccount});
        let projectContract = await ProjectContract.at(project[1]);
        await projectContract.addBackingOption("TestOption", "TestOptionDescription", 500000, 4, {from: creatorAccount});
        await projectContract.closeAddingBackingOptionPeriode({from: creatorAccount});

        await projectContract.addInvestor(1, {from: investorAccountOne, value: 500000});
        await projectContract.addInvestor(1, {from: investorAccountTwo, value: 500000});
        await projectContract.addInvestor(1, {from: investorAccountThree, value: 500000});

        await Sleep(7000);

        await projectContract.requestPayback({from: creatorAccount});

        let wasRefunded = await projectContract.contractWasRefunded();

        let investorAccountOneBalanceAfter = await web3.eth.getBalance(investorAccountOne);
        let investorAccountTwoBalanceAfter = await web3.eth.getBalance(investorAccountTwo);
        let investorAccountThreeBalanceAfter = await web3.eth.getBalance(investorAccountThree);
        
        let differanceOne = investorAccountOneBalanceAfter.toString();
        let differanceTwo = investorAccountTwoBalanceAfter.toString();
        let differanceThree = investorAccountThreeBalanceAfter.toString();

        differanceOne = differanceOne.slice(-6);
        differanceTwo = differanceTwo.slice(-6);
        differanceThree = differanceThree.slice(-6);


        assert.equal(differanceOne, '000000');
        assert.equal(differanceTwo, '000000');
        assert.equal(differanceThree, '000000');
        assert.equal(true, wasRefunded);
    });
});