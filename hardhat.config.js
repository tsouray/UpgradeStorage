/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
// require("dotenv").config();

const { rinkebyApiKey,goerliApiKey, etherscanApiKey, my_private_key} = require("./secrets.json");

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `${rinkebyApiKey}`,
      accounts: [`${my_private_key}`],
    },
    goerli: {
      url: `${goerliApiKey}`,
      accounts: [`${my_private_key}`],
    },
  },
  etherscan:{
    apiKey:`${etherscanApiKey}`
  }
}
/*

*/