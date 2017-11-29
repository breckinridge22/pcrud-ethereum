pragma solidity ^0.4.13;

// contract functionality
// contract structure
// balance structure
// List of accounts
// allow a new balance to be added to an account
// allow a balance to be updated to an account
// allow a balance to be accessed by an account
// create an account

contract Leaf {

  address public owner;

  // some sort of list of all the accounts -> key'd by their public key

  mapping(uint => Account) accounts;

  // represents a stellar balance
  struct Balance {
    bytes32 assetCode;
    // can you have a negative balance in stellar?
    uint amount;
  }

  // an Account which contains a public key and a list of balances
  struct Account {
    // corresponds to a stellar public key
    uint256 public_key;
    mapping(bytes32 => Balance) balances;
  }

  modifier onlyOwner(){
   if (msg.sender != owner) revert();
   _;
 }

  function Leaf() {
    owner = msg.sender;
  }

  // create a new Account
  // but if account already exists throw an error
  function createAccount(uint256 _public_key) onlyOwner {
    // add account with lumens loaded
    Account memory a = Account(_public_key);
    accounts[_public_key] = a;
    addBalanceToAccount(_public_key, "XLM", 31);
  }

  // add a balance to an account
  function addBalanceToAccount(uint256 _public_key, bytes32 _assetCode, uint256 _amount) onlyOwner {
    Balance memory balance = Balance(_assetCode, _amount);
    // check to make sure Account Id exists in accounts
    Account storage a = accounts[_public_key];
    a.balances[_assetCode] = balance;
  }

  // updates a given balance for an account
  function updateBalanceInAccount(uint256 _public_key, bytes32 _assetCode, uint _amount) onlyOwner{
    Account storage a = accounts[_public_key];
    Balance memory balance = Balance(_assetCode, _amount);
    a.balances[_assetCode] = balance;
  }

  // return the balance of a specific account, assetcode
  function getBalance(uint256 _public_key, bytes32 _assetCode) onlyOwner returns (uint){
    Account storage a = accounts[_public_key];
    //require(_index <= a.balances.length);
    // require that the access code is in the mapping
    return a.balances[_assetCode].amount;
  }

  function removeBalanceFromAccount(uint256 _public_key, bytes32 _assetCode) onlyOwner {
    Account storage a = accounts[_public_key];
    delete a.balances[_assetCode];
  }

  /*function deleteAccount(uint256 _public_key) onlyOwner {
      delete accounts[_public_key];
  }*/
}
