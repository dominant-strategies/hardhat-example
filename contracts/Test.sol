// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestContract {
    // Custom error definition
    error CustomError1(uint256 code, string message);

    // Event definitions
    event EventUint256(uint256 indexed value);
    event EventAddress(address indexed value);
    event EventString(string value);
    event EventBytes(bytes value);

    // Function to test CustomError1
    function testCustomError1(
        bool pass,
        uint code,
        string calldata message
    ) public pure returns (uint256) {
        if (!pass) {
            revert CustomError1(code, message);
        }
        return code;
    }

    // Function to test a string-based error
    function testErrorString(
        bool pass,
        string calldata message
    ) public pure returns (uint256) {
        require(pass, message);
        return bytes(message).length;
    }

    // Function to test panic
    function testPanic(uint256 code) public pure returns (uint256) {
        require(code != 0, "Panic: code is zero");
        return code;
    }

    // Function to emit events
    function testEvent(
        uint256 valueUint256,
        address valueAddress,
        string calldata valueString,
        bytes calldata valueBytes
    ) public {
        emit EventUint256(valueUint256);
        emit EventAddress(valueAddress);
        emit EventString(valueString);
        emit EventBytes(valueBytes);
    }

    // Function to test addition
    function testCallAdd(
        uint256 a,
        uint256 b
    ) public pure returns (uint256 result) {
        return a + b;
    }
}
