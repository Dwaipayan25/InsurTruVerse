import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Spinner } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './contracts/Marketplace.json';
import NFT from './contracts/NFT.json';
import Truflation from './contracts/TruflationTester.json';
import VerseToken from './contracts/VerseTest.json';
import Navbar from './components/Navbar';
import Create from "./components/Create";
import MyListedItems from "./components/MyListedItem";
import { useState } from 'react';
const { ethers } = require("ethers");

function App() {

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [nft, setNft] = useState(null);
  const [truflation, setTruflation] = useState(null);
  const [verseToken, setVerseToken] = useState(null);

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    //Get Provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //Set up signer
    const signer = provider.getSigner();
    
    loadContracts(signer);
  }

  const loadContracts = async (signer) => {
    const marketplace = new ethers.Contract("0x9cA97c2f873253510b886fd45847297656ec2950", Marketplace.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract("0x619f56373ea848795413e4B106C311d62aCD6F25", NFT.abi, signer);
    setNft(nft);
    const truflation = new ethers.Contract("0x211DC534C376CFEB44B4B882b6bF6F153e8DB561", Truflation.abi, signer);
    setTruflation(truflation);
    const verseToken = new ethers.Contract("0x37D4203FaE62CCd7b1a78Ef58A5515021ED8FD84", VerseToken.abi, signer);
    setVerseToken(verseToken);
    setLoading(false);
  }




  return (
    <div className="App">
      <BrowserRouter>
        <Navbar web3Handler={web3Handler} account={account} />
        {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spinner animation="border" style={{ display: 'flex' }} />
        <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
      </div>
      ):(
      <Routes>
        {/* <Route path="/" element={
          <Home marketplace={marketplace} nft={nft} />
        }/> */}
        <Route path="/create" element={<Create marketplace={marketplace} nft={nft} truflation={truflation} verseToken={verseToken}/>}/>
        <Route path="/my-listed-items" element={<MyListedItems marketplace={marketplace} nft={nft} account={account}/>}/>
        {/* <Route path="/my-purchases" element={<MyPurchases marketplace={marketplace} nft={nft} account={account}/>}/> */}
      </Routes>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
