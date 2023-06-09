import {Link} from 'react-router-dom'
import {Navbar,Nav,Button,Container,Stack} from 'react-bootstrap'
import Logo from './Logo01.jpeg'

const Navigation =({web3Handler,account,marketplace})=>{
  
    return(
        <Navbar expand="lg" variant="dark" bg="primary" style={{ backgroundColor: "blue" }}>
  <Container>
    <Navbar.Brand href="">
      <Link to='/'><img src={Logo} alt="logo" width="60" height="60" className="d-inline-block align-top" /></Link>
      {/* &nbsp; */}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className='me-auto'>
        <Nav.Link as={Link} to="/" style={{ color: "white", fontWeight: "bold" }}><Button variant="outline-light">Home</Button></Nav.Link>
        <Nav.Link as={Link} to="/create" style={{ color: "white", fontWeight: "bold" }}><Button variant="outline-light">Create</Button></Nav.Link>
        <Nav.Link as={Link} to="/my-listed-items" style={{ color: "white", fontWeight: "bold" }}><Button variant="outline-light">My Insurance</Button></Nav.Link>
        <Nav.Link as={Link} to="/profile" style={{ color: "white", fontWeight: "bold" }}><Button variant="outline-light">Profile</Button></Nav.Link>
      </Nav>
      <Nav>
        {account ? (
          <Nav.Link
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
            rel="noopener noreferrer"
            className='button nav-button btn-sm mx-4'
            style={{ color: "white", fontWeight: "bold" }}
          >
            <Button variant="outline-light" style={{backgroundColor:"green",fontWeight: "bold"}}>
              {account.slice(0, 6)}...{account.slice(-4)}
            </Button>
          </Nav.Link>
        ) : (
          <Button variant="outline-light" onClick={web3Handler} style={{ color: "yellow", fontWeight: "bold" }}>
            Connect Wallet
          </Button>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    )
}

export default Navigation;