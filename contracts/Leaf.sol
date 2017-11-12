pragma solidity ^0.4.13;

contract Leaf {

  mapping(uint => Account) accounts;

  struct Balance {
    uint balance_id;
    bytes32 assetCode;
    uint amount;
  }

  struct Account {
    uint account_id;
    // map the balances to their asset code
    mapping(bytes32 => Balance) balances;
  }

  function Leaf(){}

  function getBalances(uint _account_id) returns (mapping(bytes32 => Balance)){
    Account a = accounts[_account_id];
    return a.balances;
  }


}
