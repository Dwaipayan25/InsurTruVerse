import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function renderSoldItems(items) {
  return (
    <>
      <h2>Sold</h2>
      <Row xs={1} md={2} lg={4} className="g-4 py-3">
        {items.map((item, idx) => (
          <Col key={idx} className="overflow-hidden">
            <Card>
              <Card.Img variant="top" src={`https://ipfs.io/ipfs${item.image.substring(6)}`} />
              <Card.Footer>
                {ethers.utils.formatEther(item.price)}ETH
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

const changeToInt=(_x)=>{
    const x= ethers.utils.formatEther(_x)*(10**18);
    return x;
}

export default function MyListedItems({ marketplace, nft, account,setid }) {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])
  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()

        let item = {
        //   totalPrice,
          price: i.price,
          itemId: changeToInt(i.itemId),
          name: metadata.name,
          description: metadata.description,
          rno: metadata.rno,
          image: metadata.image
        }
        console.log(item);
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }
  function hello(n){
    console.log(n);
  }


  useEffect(() => {
    loadListedItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
      {listedItems.length > 0 ?
        <div className="px-5 py-3 container">
            <h2>Listed</h2>
          <Row xs={1} md={2} lg={4} className="g-4 py-3">
            {listedItems.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img style={{maxHeight:150 , minHeight:150}} variant="top" src={`https://ipfs.io/ipfs${item.image.substring(6)}`} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  <Card.Footer>{ethers.utils.formatEther(item.price)} VERSE</Card.Footer>
                <Link to="/NFTDetails/:id">
                    <button onClick={()=>{setid(item.itemId)}} style={{backgroundColor:'greenyellow', paddingLeft:50 ,paddingRight:50}}>
                        {/* {item.itemId} */}
                        View Details
                    </button>
                </Link>
                </Card>
              </Col>
            ))}
          </Row>
            {soldItems.length > 0 && renderSoldItems(soldItems)}
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}