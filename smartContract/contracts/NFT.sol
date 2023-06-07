// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./vtest.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    IERC20 token;
    uint256 public units = 10**18;
    address public owner;
    constructor() ERC721("INSURANCE NFT","INFT") {
        token=IERC20(0xd9145CCE52D386f254917e481eB44e9943F39138);
        owner=msg.sender;
    }

    function mint(string memory _tokenURI,uint256 price) external returns(uint){
        //->Approve from verseTest by calling approve() keeping _spender as contract address and amount as price
        bool x = token.transferFrom(msg.sender,owner,price*units);
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}
