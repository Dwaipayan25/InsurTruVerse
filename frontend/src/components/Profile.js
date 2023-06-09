import { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { Row, Form, Button } from "react-bootstrap";
import { ethers } from "ethers";

const changeToInt = (_x) => {
  const x = ethers.utils.formatEther(_x) * 10 ** 18;
  return x;
};

const fromWei = (n) => {
  return ethers.utils.formatEther(n);
};

const Profile = ({ marketplace, nft, account,verseToken }) => {
  

  const [messages, setmessages] = useState([]);
    const [price, setPrice] = useState("");
    const [idd, setIdd] = useState("");
    const[addressCustomer,setAddressCustomer]=useState("");

  useEffect(() => {
    const getMessages = async () => {
      const messages = await marketplace.getMessageOwner();
      setmessages(messages);
    };
    getMessages();
  }, []);

  const sendClaim = async () => {
    const priceInWei = ethers.utils.parseEther(price);
    console.log(price);
    const approve=await verseToken.approve(marketplace.address,priceInWei);
    await approve.wait();
    
    const tx = await marketplace.sendClaim(idd,addressCustomer, price);
    await tx.wait();

    alert("Claim sent successfully");
};

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Messages</h2>
      {messages.map((message, index) => (
        <Card
          key={index}
          className="mb-3"
          style={{ width: "700px", margin: "0 auto" }}
        >
          <Card.Body>
            <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Customer: {message.customer}
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
      <h2 style={{ textAlign: "center" , paddingTop:100}}>Pay to customers(Can only be accessed by owner of the Marketplace Contract)</h2>
      <div className="container-fluid mt-5 row content mx-auto">
        <main
        role="main"
        className="col-lg-12 mx-auto"
        style={{ maxWidth: "1000px" }}
        >
            <Row className="g-4">
            <Form.Control
                onChange={(e) => setIdd(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Address ID"
            />
            <Form.Control
                onChange={(e) => setAddressCustomer(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Address of customer"
            />
            <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in Verse"
              />
              <div className="d-grid px-0">
                <Button onClick={sendClaim} variant="primary" size="lg">
                  Send Insurance Money
                </Button>
              </div>
            </Row>
        </main>
      </div>


    </Container>
  );
};
export default Profile;
