// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

//import "hardhat/console.sol";
import "./MyStorage.sol";
import "./verifier.sol";

contract MyStorageV2 is Verifier, MyStorage {
    
    function setDataV2(uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[1] memory input,
            uint256 dev_id,
            uint256 value) public  {
        if ( verifyProof(a,b,c,input) ){
            deviceID = dev_id;
            dataTime = block.timestamp;
            dataValue = value;
        } 
    }
}
