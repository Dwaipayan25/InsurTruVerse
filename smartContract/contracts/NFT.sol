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
        token=IERC20(0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84);
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

//NFT deployed to: 0x7D2dF3C9439fd9b8c89806e1B3C717B722c1c06C
//0xeA0A9e835f21E588E549F7EC3c418A1E83Db4129
