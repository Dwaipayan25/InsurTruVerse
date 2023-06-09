import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ChainLink from "./Chainlink.webp";
import Truflation from "./Truflation.jpg";
import Verse from "./Verse.webp";
import infData from "./InfData.png";
import vehData from "./VehData.png";
import "./Home.css";
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <Container>
      <div className="mt-4">
        {/* Top Section */}
        <div className="mb-4 top">
          <Row>
            <Col>
              <div className="text-center">
                <h2>InsureShield: Revolutionizing Insurance with Inflation Protection"</h2>
                <p>Securing your future with inflation-adjusted coverage, where your premiums stay shielded from the eroding effects of inflation.</p>
              </div>
            </Col>
            <Col>
              <div className="text-center">
                <h2>Claim your Insurance today in form of NFTs!</h2>
                <br></br>
                <Link to='/create'><Button className='button1' variant="primary">Get Insurance</Button></Link>
              </div>
            </Col>
          </Row>
        </div>

        {/* Bottom Section */}
        <div>
            <h3>Powered By!</h3>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={ChainLink} />
                <Card.Body>
                  <Card.Title>ChainLink</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  Bridging the gap between off-chain data and on-chain smart contracts, enabling seamless integration of real-world information.
Automating smart contracts with precision and reliability, leveraging Chainlink's decentralized oracle network.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={Truflation} />
                <Card.Body>
                  <Card.Title>Truflation</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  Leveraging Chainlink, Truflation brings reliable and accurate inflation data from off-chain sources to the blockchain, enabling seamless integration of inflation rates into smart contracts. 
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img style={{maxHeight:300, minHeight:300}} variant="top" src={Verse} />
                <Card.Body>
                  <Card.Title>Verse Tokens</Card.Title>
                  <Card.Text style={{maxHeight:200, minHeight:200}}>
                  Safely and securely navigate the world of digital transactions on the Bitcoin.com platform.Embrace Verse token for a safer and more secure financial ecosystem. Protect your transactions and investments with advanced encryption and decentralized technology.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <div style={{paddingTop:40}}>
          <h2>History Data about Inflation and Transport</h2>
          <Row >
            <Col md={6}>
                <Card >
                    <Card.Img style={{maxHeight:400, minHeight:400}} variant="top" src={infData} />
                    <Card.Body>
                    <Card.Title>Inflation Data</Card.Title>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={6}>
                <Card >
                    <Card.Img style={{maxHeight:400, minHeight:400}} variant="top" src={vehData} />
                    <Card.Body>
                    <Card.Title>About Transport</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
        </div>

        {/* Footer */}
        
      </div>
      
    </Container>
    <footer style={{ backgroundColor: "grey", color: "white", padding: "20px" }}>
    © 2023 InsureVerse. All rights reserved. Privacy Policy | Terms of Service
    </footer>
    </div>
  );
};

export default Home;
