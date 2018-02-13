const prepared = require("./app/prepare.js");





function createAccount(public_key){
  // lets create a new account with a public key
  // need to get the contract owner
  return new Promise(function(resolve, reject) {
    prepared.Leaf.deployed()
    .then(function(instance) {
      instance.createAccount(public_key, {from: owner})
      resolve(public_key)
    })
    .catch(function(err) {
      console.log("Error creating new account");
      reject(err);
    });
  })
}


prepared.Leaf.owner()
createAccount(1);


function updateBalanceInAccount(){

}


function addBalanceToAccount(){

}

function getBalance(){

}
