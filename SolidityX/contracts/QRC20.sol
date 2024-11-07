// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; // Note: You must have a version of SolidityX to compile this contract.

/**
 * @dev Implementation of the {IERC20} interface for cross-chain transfers.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */
contract QRC20 {
    mapping(address => uint256) private _balances;

    mapping(address => mapping(address => uint256)) private _allowances;

    // List of external token contracts that can send tokens to users on this chain
    address[12] public ApprovedAddresses;
 
    uint256 private _totalSupply;

    string private _name;
    string private _symbol;
    address private _deployer;

    mapping(uint8 => uint8) public PrefixToLocation;
    mapping(uint8 => bool) public ValidPrefixes;

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    event ExternalTransfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_, uint256 initialSupply_) {
        _name = name_;
        _symbol = symbol_;
        _deployer = msg.sender;
        _mint(_deployer, initialSupply_);

        PrefixToLocation[0] = 0; // zone 0-0 // cyprus1
        PrefixToLocation[1] = 1; // zone 0-1 // cyprus2
        PrefixToLocation[2] = 2; // zone 0-2 // cyprus3
        PrefixToLocation[16] = 3; // zone 1-0 // paxos1
        PrefixToLocation[17] = 4; // zone 1-1 // paxos2
        PrefixToLocation[18] = 5; // zone 1-2 // paxos3
        PrefixToLocation[32] = 6; // zone 2-0 // hydra1
        PrefixToLocation[33] = 7; // zone 2-1 // hydra2
        PrefixToLocation[34] = 8; // zone 2-2 // hydra3
        ValidPrefixes[0] = true;
        ValidPrefixes[1] = true;
        ValidPrefixes[2] = true;
        ValidPrefixes[16] = true;
        ValidPrefixes[17] = true;
        ValidPrefixes[18] = true;
        ValidPrefixes[32] = true;
        ValidPrefixes[33] = true;
        ValidPrefixes[34] = true;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view  returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view  returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the value {ERC20} uses, unless this function is
     * overridden;
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view  returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view  returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view  returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address or an external address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }
    /**
      * @dev This function sends tokens to an address on another chain by creating an external transaction (ETX). It uses opETX
      * which constructs an external transaction and adds it to the block. The ETX will make its way over to the destination and
      * automatically execute when the given base fee is correct. The `to` must be an address on a different chain. The chain of a
      * given address is determined by the first byte of the address. gasLimit, minerTip and basefee are for executing the
      * transaction on the destination chain. Choose these carefully. The base fee and miner tip are in Wei and may not be the
      * same as they are on your current chain. If the base fee or miner tip are too low, the ETX will wait in the destination 
      * chain until they are high enough to be added in a block. You must send a value with the function call equal to the
      * following amount: (baseFee + minerTip) * gasLimit
      *
      * @param to The address of the recipient on the destination chain
      * @param amount The amount of tokens to send
      * @param gasLimit The amount of gas for execution
      * @param minerTip The tip paid to the miner for execution
      * @param baseFee The base fee
      */
    function crossChainTransfer(address to, uint256 amount, uint256 gasLimit, uint256 minerTip, uint256 baseFee) public payable {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(to)
        }
        require(!isInternal, "Address is not external");

        _burn(msg.sender, amount);
        address toAddr = ApprovedAddresses[getAddressLocation(to)];
        require(toAddr != address(0), "Token is not available on the destination chain"); 
        uint totalGas = (baseFee + minerTip) * gasLimit;
        require(msg.value  >= totalGas, string(abi.encodePacked("Not enough gas sent, need at least ", uint2str(totalGas), " wei")));
        bytes memory encoded = abi.encodeWithSignature("incomingTransfer(address,uint256)", to, amount);
        bool success;                                       // this is not used. opETX only returns false if there was an error in creating the ETX, not executing it. 
        assembly {
            success := etx(
                0,                                          // temp variable, can be anything (unused)
                toAddr,                                     // address to send to
                0,                                          // amount to send in wei
                gasLimit,                                     // gas limit (entire gas limit will be consumed and sent to destination)
                minerTip,                                     // miner tip in wei
                baseFee,                                      // base fee in wei
                add(encoded, 0x20),                                          // input offset in memory (the first 32 byte number is just the size of the array)
                mload(encoded),                                          // input size in memory (loading the first number gives the size)
                0,                                          // accesslist offset in memory
                0                                           // accesslist size in memory
            )
        }
        emit ExternalTransfer(msg.sender, to, amount);
    }
    /**
    * This function is used by an emitted ETX to send tokens to the sender.
    * The sending contract must be an approved token contract for its respective chain.
    */
    function incomingTransfer(address to, uint256 amount) public {
        require(ApprovedAddresses[getAddressLocation(msg.sender)] == msg.sender, string(abi.encodePacked("Sender ", abi.encodePacked(msg.sender), " not approved")));
        _mint(to, amount);
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view  returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public  returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public   returns (bool) { // TODO: Allow this to work cross-chain (crossChainTransferFrom)
        _spendAllowance(from, msg.sender, amount);
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public  returns (bool) {
        address owner = msg.sender;
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public  returns (bool) {
        address owner = msg.sender;
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal  {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(to)    // This opcode returns true if an address is internal
        }
        require(isInternal, "Address is external. Use cross-chain transfer function.");

        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            // Overflow not possible: the sum of all balances is capped by totalSupply, and the sum is preserved by
            // decrementing then incrementing.
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal  {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            _balances[account] += amount;
        }
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 amount) internal  {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
            // Overflow not possible: amount <= accountBalance <= totalSupply.
            _totalSupply -= amount;
        }

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal  {
        bool isInternal;
        assembly {
            isInternal := isaddrinternal(spender)    // This opcode returns true if an address is internal
        }
        require(isInternal, "Spender address is external. Use cross-chain transfer function.");

        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `amount`.
     *
     * Does not update the allowance amount in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Might emit an {Approval} event.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal  {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal  {}

    /**
     * @dev Hook that is called after any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * has been transferred to `to`.
     * - when `from` is zero, `amount` tokens have been minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens have been burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal  {}

    /**
    * @dev This function allows the deployer to add external addresses for the token contract on different chains.
    * Note that the deployer can only add one address per chain and this address cannot be changed afterwards.
    * Be very careful when adding addresses here.
    * 
    * @param chain uint8 array of the chain indexes (i.e. cyprus 1 = 0, cyprus 2 = 1)
    * @param addr array of the addresses to add as approved
    */
    function AddApprovedAddresses(uint8[] calldata chain, address[] calldata addr) external {
        require(msg.sender == _deployer, "Sender is not deployer");
        require(chain.length == addr.length, "chain and address arrays must be the same length");
        for(uint8 i = 0; i < chain.length; i++) {
            require(chain[i] < 9, "Max 9 zones");
            require(ApprovedAddresses[chain[i]] == address(0), "The approved address for this zone already exists");
            ApprovedAddresses[chain[i]] = addr[i];
        }
    }

    /**
     * @dev This function uses the stored prefix list to determine an address's location based on its first byte.
     * 
     * @param addr address to check location of
     */
    function getAddressLocation(address addr) public view returns (uint8) {
        uint8 prefix =  uint8(toBytes(addr)[0]);
        if (ValidPrefixes[prefix]) {
            return PrefixToLocation[prefix];
        }
        revert("Invalid Location");
    }

    /**
     * @dev This function uses `abi.encodePacked` to encode the address into a bytes format.
     * 
     * @param a The address to be converted to bytes.
     */
    function toBytes(address a) public pure returns (bytes memory) {
        return abi.encodePacked(a);
    }

    /**
     * @notice Converts an unsigned integer to its decimal string representation.
     *
     * @param _i The unsigned integer to convert to a string.
     */
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}