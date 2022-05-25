const { expect } = require('chai');
const { ethers } = require('hardhat');
const {Contract, BigNumber } = require('ethers');



describe('MyStorage contract', function () {
  let Mystorage;
  let mystorage;
  beforeEach(async function() {
    Mystorage = await ethers.getContractFactory("MyStorage");
    mystorage = await upgrades.deployProxy(Mystorage, [42], {initializer: 'set'});
    
    console.log(mystorage.address," MyStorage(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(mystorage.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(mystorage.address)," getAdminAddress")  
  })

  it('set and get the store value', async function () {
    console.log('initialized value:')
    const storedValue = await mystorage.get()
    expect(storedValue).to.equal(42)
    console.log('Set a new value:')
    await mystorage.set(123)
    expect(await mystorage.get()).to.equal(BigNumber.from('123'))
  })
})