
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

Leaf.new({from: owner, gas: 1555000}).then(function(instance) {
  //console.log(instance);
  leaf = instance
  leaf.createAccount(1, {from: owner})
  return leaf.getBalance(1, "XLM", {from: owner})
}).then(function(result) {
  // If this callback is called, the transaction was successfully processed.
  console.log(result)
}).catch(function(e) {
  console.log(e)
})

// Leaf.deployed().then(function(instance) {
//   return instance.createAccount(1, {from: owner})
// }).then(function(response) {
//   console.log(response)
// })

//var leaf = Leaf.new({from: owner})
