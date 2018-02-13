
// this will give us the leaf object
var Leaf = artifacts.require("./Leaf.sol");

contract('Leaf', function(accounts) {

  var contract;
  var public_key = 1;
  var xlm = "XLM";
  var default_xlm = 31;

  var code = "USD"
  var default_usd = 100;

  var new_xlm_amount = 100;

  var owner = accounts[0];

  beforeEach(function () {
    return Leaf.new({from: owner})
    .then(function(instance){
      contract = instance;
    })
  });

  it("helloworld", function() {
    assert.strictEqual(true, true, "Hm");
  });

  it("Should be owned by Owner", function() {
    return contract.owner({from: owner})
    .then(function(_owner) {
      assert.strictEqual(_owner, owner, "Contract is not owned by the owner");
    });
  });

  // should create a new account
  it("Should Create a new Account with default XLM balance", function() {
    return contract.createAccount(public_key, {from: owner})
    .then(function() {
      return contract.getBalance(public_key, xlm, {from: owner})
      .then(function(_balance) {
        assert.equal(_balance.toString(10), default_xlm, "Default XLM is incorrect")
      });
    });
  });

  it("Should add a new balance", function() {
    return contract.createAccount(public_key, {from: owner})
    .then(function() {
      return contract.addBalanceToAccount(public_key, code, default_usd, {from: owner})
      .then(function() {
        return contract.getBalance(public_key, code, {from: owner})
        .then(function(_balance) {
          assert.equal(_balance.toString(10), default_usd, "Balance was not added successfully")
        });
      });
    });
  });

it("Should update a balance", function () {
  return contract.createAccount(public_key, {from: owner})
  .then(function() {
    return contract.updateBalanceInAccount(public_key, xlm, new_xlm_amount, {from: owner})
    .then(function() {
      return contract.getBalance(public_key, xlm, {from: owner})
      .then(function(_amount) {
        assert.equal(_amount.toString(10), new_xlm_amount, "Balance was not updated successfully")
      });
    });
  });

});

it("Should delete a balance", function () {
  contract.removeBalanceFromAccount(public_key, {from: owner})
  .then(function(){
    return contract.getBalance(public_key, xlm, {from:owner})
    .then(function(_amount){
      assert.equal(console.log(_amount), NULL, "Balance was not deleted properly")
    });
  });
});

  // should add a new balance


  // should update a balance


  // should get a balance


  // should remove a balance

});
