# UpgradeStorage
Use openzeppelin Upgrades Plugins and zksnark

## Setup
```
yarn
```
## Compile
```
yarn hardhat compile
```

## Deploy
> Deploy in localhost (turn on another terminal, change path to project then exectue : %yarn hardhat node)
> ```
> yarn hardhat run --network localhost scripts/1.deploy_mystorage.js
> ```
> Copy mystorage(proxy) address, then paste it to 2.deploy_mystorageV2.js
> ```
>  const proxyAddress = '0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B' 
> ```
> Upgrade 
> ```
> yarn hardhat run --network rinkeby scripts/2.deploy_mystorageV2.js 
> ```
  



