import { ethers } from "ethers";
import { useState, useEffect } from "react";
import dumphoto from "./Logo01.jpeg";
import "./NFTDetails.css";
import { Row, Form, Button } from "react-bootstrap";
import { Card, Container } from "react-bootstrap";

function hello(n) {
  console.log(n);
}

const changeToInt = (_x) => {
  const x = ethers.utils.formatEther(_x) * 10 ** 18;
  return x;
};
const fromWei = (n) => {
  return ethers.utils.formatEther(n);
};

const trimLast18 =(n)=>{
  return (n.toString().slice(0,-18));
}


const NFTDetails = ({
  marketplace,
  nft,
  truflation,
  verseToken,
  account,
  id,
}) => {
  const [data, setData] = useState([]);
  const [NFTData, setNFTData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rno, setRno] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [duration, setDuration] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [owner, setOwner] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [claimPrice, setClaimPrice] = useState("");
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await marketplace.getItemDetail(id);
      console.log(data);
      setData(data);
      const i = await marketplace.items(id);
      const uri = await nft.tokenURI(i.tokenId);
      const response = await fetch(uri);
      const metadata = await response.json();
      console.log(metadata);
      setNFTData(metadata);
      setName(metadata.name);
      setDescription(metadata.description);
      setRno(metadata.rno);
      setImage(metadata.image);
      setPrice(changeToInt(data.price));
      setIssueDate(changeToInt(data.timestamp));
      setDuration(changeToInt(data.duration));
      setExpiryDate(changeToInt(data.timestamp) + changeToInt(data.duration));
      setOwner(data.owner);
      console.log(name);
      console.log(description);
      console.log(rno);
      console.log(image);
      console.log(price);
      console.log(issueDate);
      console.log(duration);
      console.log(expiryDate);
      console.log(owner);
      const messages = await marketplace.getMessageNFT(id);
      setmessages(messages);
      console.log(messages);
    };
    getData();
  }, []);

    const claim = async () => {
        const price = ethers.utils.parseEther(claimPrice);
        const tx = await marketplace.requestClaim(id, price);
        await tx.wait();
        console.log("Claim requested");
    };


  return (
    <div>
    <div className="item-container">
      <div className="item-details">
        <div className="item-right">
          <img
            src={`https://ipfs.io/ipfs${image.substring(6)}`}
            alt="Item"
            className="item-image"
          />
        </div>
        <div className="item-left">
          <table className="item-table">
            <tbody>
              <tr>
                <td className="item-label">Name:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td className="item-label">Description:</td>
                <td>{description}</td>
              </tr>
              <tr>
                <td className="item-label">Owner:</td>
                <td>{owner}</td>
              </tr>
              <tr>
                <td className="item-label">Issue Date:</td>
                <td>
                {new Date(
                          issueDate * 1000
                        ).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="item-label">Valid Till:</td>
                <td>
                    {new Date(
                          expiryDate * 1000
                        ).toLocaleString()}
                </td>
              </tr>
              <tr>
              </tr>
                <td className="item-label">Value:</td>
                <td>{trimLast18(price)} VTEST</td>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
    <div className="container-fluid mt-5 content mx-auto row">
    <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
    <Row className="g-4" style={{paddingTop:30}}>
        <h2>If you want to claim insurance for your car then fill the form below</h2>
    <Form.Control
                onChange={(e) => setClaimDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setClaimPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in Verse"
              />
    <div className="d-grid px-0">
        <Button onClick={claim} variant="primary" size="lg">
          Request for Insurance Claim
        </Button>
        </div>
        
    </Row>
    </main>
    </div>
    
    <h2 style={{paddingTop:100, textAlign: "center" }}>Insurance Claimed</h2>
      {messages.map((message, index) => (
        <Card
          key={index}
          className="mb-3"
          style={{ width: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              SentBy: {message.customer}
            </Card.Title>
            <Card.Text>
              <strong>Address ID:</strong> {changeToInt(message.itemId)}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> {(ethers.utils.formatEther(message.price).toString())} VTEST
            </Card.Text>
            <Card.Text>
              <strong>Reason:</strong> {message.reason}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    
    </div>
  );
};

export default NFTDetails;
