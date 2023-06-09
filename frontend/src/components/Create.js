import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
// import {DurationInput} from 'react-bootstrap-datetimepicker';
import axios from "axios";

const toWei = (n) => {
  return ethers.utils.parseEther(n.toString());
};

const Create = ({ marketplace, nft, truflation, verseToken }) => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [rno,setRno]=useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [jsonData, setJsonData] = useState(null);

  const handleDeadlineChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentTime = new Date();
    const timeDifference = selectedDate.getTime() - currentTime.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    setDeadline(secondsDifference);
  };

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    let imh = "";
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `dd41c64a3d7436504778`,
            pinata_secret_api_key: `27e3fd3d1caff47b2a1c34e445455c19069518b3ff616ad07a303cbe778afeb9`,
            "Content-Type": `multipart/form-data`,
          },
        });
        imh = `ipfs://${resFile.data.IpfsHash}`;
        setImage(imh);
        console.log(imh);
        // alert("Sucessfully image uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const createNFT = async () => {
    console.log(image, price, name, description);
    if (!image || !price || !name || !description || !rno) return;
    try {
      const metaData = JSON.stringify({ image, name, description, rno, price});
  
      const formData = new FormData();
      formData.append("file", new Blob([metaData], { type: "application/json" }));
  
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: "dd41c64a3d7436504778",
          pinata_secret_api_key: "27e3fd3d1caff47b2a1c34e445455c19069518b3ff616ad07a303cbe778afeb9",
          "Content-Type": "multipart/form-data",
        },
      });
  
      mintThenList(resFile.data.IpfsHash);
    } catch (error) {
      console.log("IPFS metadata upload error: ", error);
    }
  };

  const mintThenList = async (result) => {
    const uri = `https://ipfs.io/ipfs/${result}`;
    console.log(uri);
    console.log(nft);
    
    //approve verse token to spend nft
    const approve=await verseToken.approve(nft.address,toWei(price));
    await approve.wait();
    // mint nft
    const minting=await nft.mint(uri,price);
    await minting.wait(); // Wait for the transaction to be mined
  
    // get tokenId of new nft
    console.log(1);
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    console.log(3);
    const listingPrice = ethers.utils.parseEther(price.toString());
    console.log(listingPrice.toString());
    await(await marketplace.makeItem(nft.address, id, listingPrice,name,rno,deadline)).wait();
    console.log(4);
    alert("NFT created and Insurance approved");
  };
  
  
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mx-auto">
            Upload an image of your Vehicle to claim the NFT as Insurance
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                required
                as="textarea"
                placeholder="Description"
              />
              <Form.Control
                onChange={(e) => setRno(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Vehicle Registration Number"
              />
              <Form.Control
                onChange={(e) => setPrice(e.target.value)}
                size="lg"
                required
                type="number"
                placeholder="Price in Verse"
              />
              <Form.Control
                type="date"
                value={deadline !== 0 ? new Date((new Date()).getTime() + deadline * 1000).toISOString().split("T")[0] : ""}
                onChange={handleDeadlineChange}
              />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;