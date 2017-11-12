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

  address owner;

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
    uint public_key;
    mapping(uint => Balance) balances;
  }

  modifier onlyOwner(){
   if (msg.sender != owner) revert();
   _;
 }

  function Leaf(){
    owner = msg.sender()
  }

  // create a new Account
  function createAccount(uint _public_key) onlyOwner {
    Account a = Account(public_key, new Balance[]);
    accounts[_public_key] = a;
  }

  // add a balance to an account
  function addBalanceToAccount(uint _public_key, bytes32 _assetCode, uint256 _amount) onlyOwner {
    Balance memory balance = Balance(_assetCode, _amount);
    // check to make sure Account Id exists in accounts
    Account a = accounts[_public_key];
    a.balances[_assetCode] = a;
  }

  // updates a given balance for an account
  function updateBalanceInAccount(uint _public_key, bytes32 _assetCode, _uint _amount) onlyOwner{
    Account a = accounts[_public_key];
    Balance memory balance = Balance(_assetCode, _amount);
    a.balances[_assetCode] = balance;
  }

  // return the balance of a specific account, assetcode
  function getBalance(uint _public_key, bytes32 _assetCode) onlyOwner returns (Balance){
    Account a = accounts[_public_key];
    //require(_index <= a.balances.length);
    // require that the access code is in the mapping
    return a.balances[_assetCode];
  }


}
