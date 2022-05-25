# UpgradeStorage
Use openzeppelin Upgrades Plugins and zksnark

## Git Clone
```
git clone https://github.com/tsouray/UpgradeStorage.git
```
## Setup
```
cd UpgradeStorage
yarn
```
## Compile
```
yarn hardhat compile
```

## Deploy - Localhost
> Deploy proxy in localhost (turn on another terminal, change path to project then exectue : %yarn hardhat node)
> ```
> yarn hardhat run --network localhost scripts/1.deploy_mystorage.js
> ```
> Copy mystorage(proxy) address, then paste it to 2.deploy_mystorageV2.js
> ```
>  const proxyAddress = '0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B' 
> ```
> Upgrade 
> ```
> yarn hardhat run --network localhost scripts/2.deploy_mystorageV2.js 
> ```
  
## Testing
> ```
> yarn hardhat test --network localhost test/1.myStorage.proxy-test.js 
> yarn hardhat test --network localhost test/2.myStorage.proxy-test.js 
> ```

## Deploy - Testing network
create a secrets.json
```
touch secrets.json
```
In secrets.json, fill out your project id and wallet key. It look like below.   
>>{    
    "rinkebyApiKey": "https://rinkeby.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX",    
    "goerliApiKey": "https://goerli.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXX",    
    "etherscanApiKey": "YDXXXXXXXXXXXXXXXXXXXXXXXX",    
    "my_private_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"    
}    

>deploy in Rinkeby 
>```
>yarn hardhat run --network rinkeby scripts/1.deploy_mystorage.js
>yarn hardhat run --network rinkeby scripts/2.deploy_mystorageV2.js 
>```






