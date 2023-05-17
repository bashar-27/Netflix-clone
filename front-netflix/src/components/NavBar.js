import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./nav.css"

function NavBar() {
  return (
    <>
     <Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand style={{border:"1px,1px",}}>Netflix</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/favlist">Favorite Movie</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <br />
    </>
  );
}

export default NavBar;