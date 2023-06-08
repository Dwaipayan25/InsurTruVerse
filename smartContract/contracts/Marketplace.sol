// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./vtest.sol";


contract Marketplace is ReentrancyGuard{
    address payable public feeAccount;
    uint256 public itemCount;
    IERC20 token;
    uint256 public unit=10**18;

    constructor(){
        feeAccount = payable(msg.sender);
        token=IERC20(0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84);
    }

    event Offered(uint itemId,address indexed nft,uint tokenId,uint price,address indexed seller);

    struct Item{
        uint256 itemId;
        IERC721 nft;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool active;
    }
    
    struct Details{
        uint256 itemId;
        uint256 price;
        address owner;//In struct item it is mentioned as seller
        string name;
        string registrationNumber;
        uint256 timestamp;
        uint256 duration;
        bool active;
    }

    struct message{
        address customer;
        uint256 itemId;
        uint256 price;
        string reason;
    }

    mapping(address=>message[])public messages;
    mapping(uint256=>message[])public messagesNFT;
    

    //itemId=>Item
    mapping(uint256 => Item) public items;
    mapping(uint256 => Details) public itemDetails;

    

    function makeItem(IERC721 _nft,uint256 tokenId, uint256 price,string memory name,string memory rNo,uint256 duration) external nonReentrant{
        require(price > 0,"Price must be greater than 0");
        itemCount++;
        _nft.transferFrom(msg.sender,address(this),tokenId);
        items[itemCount] = Item(
            itemCount,
            _nft,
            tokenId,
            price,
            payable(msg.sender),
            true
        );
        itemDetails[itemCount] = Details(
            itemCount,
            price,
            msg.sender,
            name,
            rNo,
            block.timestamp,
            duration,
            true
        );
         emit Offered(itemCount,address(_nft),tokenId,price,msg.sender);
    }

    function requestClaim(uint256 itemId,uint256 claimPrice)public{
        require(msg.sender==items[itemId].seller);
        message memory newMessage = message(msg.sender, itemId, claimPrice*unit, "I am claiming Insurance for my car");
        messages[feeAccount].push(newMessage);
    }

    function sendClaim(uint256 itemId,address customer,uint256 claimPrice)public returns(bool){
        require(msg.sender==feeAccount);
        bool x=token.transferFrom(msg.sender,customer,claimPrice*unit);
        message memory newMessage = message(msg.sender, itemId, claimPrice, "Your claim for Insurance is approved and sent");
        messagesNFT[itemId].push(newMessage);
        messages[customer].push(newMessage);
        return x;
    }

    function checkActive(uint itemId)public{
        if(itemDetails[itemId].timestamp + itemDetails[itemId].duration <= block.timestamp){
            itemDetails[itemId].active=false;
            items[itemId].active=false;
        }
    }

    function getItemDetail(uint256 itemId)public view returns(Details memory){
        return itemDetails[itemId];
    }
    
    function getMessageNFT(uint256 itemId)public view returns(message[] memory){
        return messagesNFT[itemId];
    }
    function getMessageOwner()public view returns(message[] memory){
        return messages[msg.sender];
    }
}

//Marketplace deployed to: 0x2A99F14C43CF92c97457E2dE49146cBe12F204aF