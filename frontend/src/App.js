import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import MyStorage from './artifacts/contracts/MyStorage.sol/MyStorage.json'
import MyStorageV2 from './artifacts/contracts/MyStorageV2.sol/MyStorageV2.json'
import { joinSignature } from 'ethers/lib/utils'

// NOTE: Make sure to change this to the contract address you deployed
const myStorageAddress = '0x9d2D20B332bd1b0441e47CC3D5c989B98df7D92B'
// ABI so the web3 library knows how to interact with our contract
const myStorageAbi = MyStorage.abi
const myStorageAbiV2 = MyStorageV2.abi

// NOTE: checkout the API for ethers.js here: https://docs.ethers.io/v5/api/
// TIP: Remember to console.log something if you are unsure of what is being returned

const App = () => {
  const [provider, setProvider] = useState()
  const [inputValue, setInputValue] = useState('')
  const [value, setValue] = useState('0')
  const [blockNumber, setBlockNumber] = useState('0')
  const [gasPrice, setGasPrice] = useState('0')
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('')
  const [connected, setConnected] = useState(false)
  const [DeviceArray, setDeviceArray] = useState([0,0,0])
  const [inputArray, setInputArray] = useState([20,10])

  // Will run once everytime a user connects to the dapp
  useEffect(() => {
    // check if ethereum is provided by something like Metamask
    if (typeof window.ethereum !== 'undefined') {
      console.log('ethereum is available')

      // get provider injected by metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // Set some data like block number and gas price provided, you can find more options in the API docs
      const setBlockchainData = async () => {
        setBlockNumber(await provider.getBlockNumber())
        let gasPrice = await provider.getGasPrice()
        // formats a returned big number as gwei where 1,000,000,000 gwei is 1 ether
        // you can read about more denominations here: https://ethdocs.org/en/latest/ether.html
        gasPrice = Math.trunc(ethers.utils.formatUnits(gasPrice, 'gwei'))
        setGasPrice(gasPrice)
      }

      // Set aquired blockchain data as state to use in our frontend
      setBlockchainData()

      // Set provider so we can use it in other functions
      setProvider(provider)
    }
  }, [])

  // handles setting account and balance
  const accountHandler = async (account) => {
    setAccount(account)
    const balance = await provider.getBalance(account)
    // notice that we use format ether here, uncomment the following console.log and see what happens if we don't
    setBalance(ethers.utils.formatEther(balance))
  }

  // handles connecting account
  const connectHandler = async () => {
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const accountList = await provider.listAccounts()
    console.log(accountList)
    accountHandler(accountList[0])
    setConnected(true)
  }

  // handles submit button
  const handleSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault()

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      myStorageAddress,
      myStorageAbi,
      provider
    )

    // a signer is necessary when your want to write to the blockchain
    // your wallet doesn't need to sign or spend any ether to read from the blockchain
    // but it does need to spend ether and therefore sign to write to the blockchain
    const signer = provider.getSigner()
    const contractWithSigner = contract.connect(signer)
    // we can use 'set' here because the abi provides us with a reference to the methods defined in our smart contract
    console.log(await contractWithSigner.set(inputValue))
    //console.log(inputValue)
  }

  const handleDeviceSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault()

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      myStorageAddress,
      myStorageAbi,
      provider
    )

    // a signer is necessary when your want to write to the blockchain
    // your wallet doesn't need to sign or spend any ether to read from the blockchain
    // but it does need to spend ether and therefore sign to write to the blockchain
    const signer = provider.getSigner()
    const contractWithSigner = contract.connect(signer)
    // we can use 'set' here because the abi provides us with a reference to the methods defined in our smart contract
    const myArray = inputArray.split(",");
    //console.log(myArray)
    const myArrayNum = [];
    myArray.forEach(str => {
      myArrayNum.push(Number(str));
    })
    //console.log(myArrayNum)
    console.log(await contractWithSigner.setData(myArrayNum[0],myArrayNum[1]))
  }
  const handleDeviceSubmitV2 = async (e) => {
    // stops page from refreshing
    e.preventDefault()

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      myStorageAddress,
      myStorageAbiV2,
      provider
    )

    // a signer is necessary when your want to write to the blockchain
    // your wallet doesn't need to sign or spend any ether to read from the blockchain
    // but it does need to spend ether and therefore sign to write to the blockchain
    const signer = provider.getSigner()
    const contractWithSigner = contract.connect(signer)
    // we can use 'set' here because the abi provides us with a reference to the methods defined in our smart contract
    console.log('V2:',inputArray)
    const myArray = inputArray.split(",");
    console.log(myArray)
    const myArrayNum = [];
    myArray.forEach(str => {
      myArrayNum.push(Number(str));
    })
    console.log(myArrayNum)
    console.log(await contractWithSigner.setDataV2(
      ["0x13553b1dfa4dcee139cc9b06952e3e86ac562cd5bbeb1f8d70b2a4d971942a6c",
      "0x1a50e2e66cf343436d99e3f912b7fe3788eb0049a20b7deae84999c502baf4fe"],
      [["0x1cb0d27fcaac2eeb8f1661b2aa3d6883e827d0c4e65cf955679aea62a4516055",
      "0x11e92aef06abdeb24bb049f4f5c83c1f1d7a09d097e715ab83d6484cb1da91d9"],
      ["0x2a6a93b0de8ebd4ecd313884118e00460b246879c772b2218b74a4737483a1a2",
      "0x0bd920f5d99cc7181b78fc3d8f857bdfa6e4fc9b77fd690f5fd62fc1ebcc7e89"]],
      ["0x1184ae0c35d75b89bd0799bbd0bc5a8544449c388bdb0d41cbebe05e55235d59",
      "0x2e9d4dd37264ef1d94e28f4726e367d0b7a53ad3895669c1378e55ee36276332"],
      ["0x21"],
      myArrayNum[0],
      myArrayNum[1]))
  }

  const handleRetrieveData = async () => {
    const myStorageContract = new ethers.Contract(
      myStorageAddress,
      myStorageAbi,
      provider
    )
    // we can use 'get' here because the abi provides us with a reference to the methods defined in our smart contract
    setValue(ethers.utils.formatUnits(await myStorageContract.get(), 0))
  }

  const handleRetrieveDeviceData = async () => {
    console.log('get data')
    const myStorageContract = new ethers.Contract(
      myStorageAddress,
      myStorageAbi,
      provider
    )
    const deviceInfo = await myStorageContract.getData()
    setDeviceArray([deviceInfo[0].toNumber(),deviceInfo[1].toNumber(),deviceInfo[2].toNumber()] )
  }

  return (
    <div className='layout'>
      <header className='navbar'>
        <div className='container'>
          <div className='logo'>My Storage V2</div>
          {connected ? (
            <div>
              <label>
                {`${Number.parseFloat(balance).toPrecision(4)} ETH`}
              </label>
              <button className='account-button' onClick={connectHandler}>
                {account.substring(0, 6)}...
                {account.substring(account.length - 4)}
              </button>
            </div>
          ) : (
            <button className='connect-button' onClick={connectHandler}>
              Connect
            </button>
          )}
        </div>
      </header>
      <section className='cards'>
        <div className='card'>
          <h2>Set Device Data (ID, Value) </h2>
          <form onSubmit={handleDeviceSubmit}>
            <input
              type='text'
              required
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              name='deviceData'
              placeholder='0'
            /> 
            <button>Submit</button>
          </form>
        </div>
        <div className='card'>
          <h2>Set Device Data (ID, Value) V2 </h2>
          <form onSubmit={handleDeviceSubmitV2}>
            <input
              type='text'
              required
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              name='deviceData'
              placeholder='0'
            /> 
            <button>Submit</button>
          </form>
        </div>
        <div className='card'>
          <h2>Get Device Data </h2>
          <button onClick={handleRetrieveDeviceData}>Retrieve</button>
          <label>ID:{DeviceArray[0]} value:{DeviceArray[2]} Time:{DeviceArray[1]}</label>
        </div>
      </section>
      <section className='cards'>
        <div className='card'>
          <h2>Set Value</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              required
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
              name='value'
              placeholder='0'
            />
            <button>Submit</button>
          </form>
        </div>
        <div className='card'>
          <h2>Get Value</h2>
          <button onClick={handleRetrieveData}>Retrieve</button>
          <label>{value}</label>
        </div>
      </section>
      <footer>
        <div className='container'>
          {gasPrice} gwei &bull; {blockNumber}
        </div>
      </footer>
    </div>
  )
}

export default App
