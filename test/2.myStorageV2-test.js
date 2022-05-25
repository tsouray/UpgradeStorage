const { expect } = require('chai');
const { ethers } = require('hardhat');
const {Contract, BigNumber } = require('ethers');

describe('MyStorage contract', function () {
  let Mystorage;
  let MystorageV2;
  let mystorage;
  let mystorageV2;

  beforeEach(async function() {
    Mystorage = await ethers.getContractFactory("MyStorage");
    MystorageV2 = await ethers.getContractFactory("MyStorageV2");
    mystorage = await upgrades.deployProxy(Mystorage, [42], {initializer: 'set'});
    mystorageV2 = await upgrades.upgradeProxy(mystorage.address, MystorageV2);

    console.log(mystorageV2.address," MyStorageV2(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(mystorageV2.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(mystorageV2.address)," getAdminAddress")  
  })

  it('set and get the store value', async function () {
    console.log('initialized value:')
    const storedValue = await mystorageV2.get()
    expect(storedValue).to.equal(42)
    console.log('Set a new value:')
    await mystorageV2.set(123)
    expect(await mystorageV2.get()).to.equal(BigNumber.from('123'))
  })
})