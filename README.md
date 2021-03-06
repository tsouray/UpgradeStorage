# UpgradeStorage
Use openzeppelin Upgrades Plugins and zksnark

## Git Clone
```
git clone https://github.com/tsouray/UpgradeStorage.git
```
## Setup project
```
cd UpgradeStorage
yarn
```
## Compile smart contracts
```
yarn hardhat compile
```

## Deploy smart contracts - Localhost
> ( **Turn on another terminal, change path to project, then exectue : %yarn hardhat node** )    
> Deploy proxy in localhost 
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
  
## Testing - Localhost
> ```
> yarn hardhat test --network localhost test/1.myStorage.proxy-test.js 
> yarn hardhat test --network localhost test/2.myStorage.proxy-test.js 
> ```

## Deploy - Testing Rinkeby network
Create a secrets.json (It's for hardhat.config.js to read secrets information.)     
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

> 1. Deploy proxy in Rinkeby: 
> ```
> yarn hardhat run --network rinkeby scripts/1.deploy_mystorage.js
> ```
> 2. Copy mystorage(proxy) address, then paste it to 2.deploy_mystorageV2.js
> 3. Upgrade:
> ```
> yarn hardhat run --network rinkeby scripts/2.deploy_mystorageV2.js 
> ```

## Frontend
>install package
>```
>cd frontend
>yarn
>```
>modify frontend/src/App.js
>>NOTE: Make sure to change this to the contract address you deployed.    
>>const myStorageAddress = '0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B' // proxy Address      

>Run web server
>```
>yarn start
>```
>http://localhost:3000/    
>![image](https://github.com/tsouray/UpgradeStorage/blob/main/frontend/webDemo.png)
>




