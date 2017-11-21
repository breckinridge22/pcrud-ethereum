
const contract = require('truffle-contract');
const LeafArtifacts = require("./build/contracts/Leaf.json");
//const isbn = require('node-isbn');

const Leaf = contract(LeafArtifacts)

var fs = require("fs");
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

Leaf.setProvider(web3.currentProvider)

var owner = web3.eth.accounts[0]

return Leaf.new({from: owner, gas: 470000})

// Leaf.deployed().then(function(instance) {
//   return instance.createAccount(1, {from: owner})
// }).then(function(response) {
//   console.log(response)
// })

//var leaf = Leaf.new({from: owner})
