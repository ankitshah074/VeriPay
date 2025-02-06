const EscrowContract = artifacts.require("EscrowContract");

contract("EscrowContract", (accounts) => {
    it("should lock funds in escrow", async () => {
        const instance = await EscrowContract.deployed();
        await instance.createJob("Test Job", { from: accounts[0], value: web3.utils.toWei("1", "ether") });
        const balance = await web3.eth.getBalance(instance.address);
        assert.equal(balance, web3.utils.toWei("1", "ether"));
    });
});