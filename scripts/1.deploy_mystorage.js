const { ethers, upgrades } = require('hardhat');

async function main() {
    // We get the contract to deploy
    const MyStorage = await ethers.getContractFactory("MyStorage");
    console.log('Deploying MyStorage...');
    const mystorage = await upgrades.deployProxy(MyStorage, [42], { initializer: 'set' });
    await mystorage.deployed();
    // NOTE: All Contracts have an associated address
    //console.log('MyStorage deployed to:', mystorage.address);
    console.log(mystorage.address," mystorage(proxy) address")
    console.log(await upgrades.erc1967.getImplementationAddress(mystorage.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(mystorage.address)," getAdminAddress")    
    
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
// localhost : 0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9

/* Rinkeby
%yarn hardhat run --network rinkeby scripts/1.deploy_mystorage.js
0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B  mystorage(proxy) address
0x715eD43f7010d71c3b790b94CD5C9a7EeaEfc371  getImplementationAddress
0x92475D313B0a58dd1EEdb86EC77a858b7B21F04D  getAdminAddress
*/    