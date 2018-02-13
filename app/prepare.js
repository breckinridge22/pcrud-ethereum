const Web3 = require("web3");

// // Good practice, we could have already defined web3.
// if (typeof web3 !== 'undefined') {
//     // Use its provider.
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // Use IPC.
//     web3 = new Web3(new Web3.providers.IpcProvider(
//         process.env['HOME'] + '/.ethereum/net42/geth.ipc',
//         require('net')));
// }

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

web3.eth.getAccounts(console.log);

const truffleContractFactory = require("truffle-contract");
// ABI and Truffle goodies
const LeafJson = require("../build/contracts/Leaf.json");
const Leaf = truffleContractFactory(LeafJson);
const MigrationsJson = require("../build/contracts/Migrations.json");
const Migrations = truffleContractFactory(MigrationsJson);

//console.log(Leaf);

// Instruct the contracts to use the prepared Geth node.
[Leaf, Migrations].forEach(contract =>
    contract.setProvider(web3.currentProvider));

//accounts = new Promised(functionweb3.eth.getAccounts();
//console.log(accounts)
//owner = accounts[0]

//Leaf.new({from: owner})
// lets write some methods to wrap around this smart contracts



// // Convenience method
// web3.eth.getAccountsPromise = () =>
//     new Promise((resolve, reject) =>
//         web3.eth.getAccounts((error, accounts)  =>
//             error ? reject(error) : resolve(accounts)));
//
// // Get the first account's balance
// web3.eth.getAccountsPromise()
//     .then(accounts => Leaf.deployed()
//         .then(instance => instance.getBalance.call(accounts[0]))
//     )
//     .then(balance => console.log("balance: " + balance.toString(10)))
//     .catch(console.error);

module.exports = {
    web3: web3,
    Leaf: Leaf,
    Migrations: Migrations
};
