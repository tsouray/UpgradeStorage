const { ethers, upgrades } = require('hardhat');

//const proxyAddress = '0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9'
const proxyAddress = '0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B' 

async function main() {
    console.log(proxyAddress," original Box(proxy) address")
    // We get the contract to deploy
    const MyStorageV2 = await ethers.getContractFactory("MyStorageV2")
    console.log("upgrade to MyStorageV2...")
    const mystorageV2 = await upgrades.upgradeProxy(proxyAddress, MyStorageV2)
    console.log(mystorageV2.address," MyStorageV2 address(should be the same)")
  
    console.log(await upgrades.erc1967.getImplementationAddress(mystorageV2.address)," getImplementationAddress")
    console.log(await upgrades.erc1967.getAdminAddress(mystorageV2.address), " getAdminAddress")    
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
    
/* localhost:
0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9  original Box(proxy) address
upgrade to MyStorageV2...
0xa82fF9aFd8f496c3d6ac40E2a0F282E47488CFc9  MyStorageV2 address(should be the same)
0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8  getImplementationAddress
0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  getAdminAddress
*/    

/*Rinkeby:
0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B  original Box(proxy) address
upgrade to MyStorageV2...
0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B  MyStorageV2 address(should be the same)
0x715eD43f7010d71c3b790b94CD5C9a7EeaEfc371  getImplementationAddress
0x92475D313B0a58dd1EEdb86EC77a858b7B21F04D  getAdminAddress
✨  Done in 19.29s.

*/