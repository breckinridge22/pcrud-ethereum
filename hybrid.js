// need to deploy the contract
// need to save the hashed address
// need to init web3 via the deployed contract
//
var Web3 = require('web3');
var fs = require('fs');
var solc = require('solc');

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

path = "contracts/Leaf.sol"
code = fs.readFileSync(path).toString()

compiledCode = solc.compile(code)

abiDefinition = JSON.parse(compiledCode.contracts[':Leaf'].interface)
LeafContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Leaf'].byteCode
deployedContract = LeafContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 53753})
contractInstance = LeafContract.at(deployedContract.address)

// Lets use truffle to interact with the contract.
