// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Box {
    uint256 private value;

    event ValueChanged(uint256 newValue);

    function initialize(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function retrieve() public view returns (uint256) {
        return value;
    }

    function store(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }
}