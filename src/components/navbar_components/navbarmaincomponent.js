import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';

function NavbarMainComponent({isLoggedIn,logout, fetchPost}) {
  const options = [
    {"value": "Computer Science","name":"Computer Science"},
    {"value": "Electronics","name":"Electronics"},
    {"value": "Mechanical","name":"Mechanical"},
    {"value": "Electrical","name":"Electrical"},
    {"value": "Civil","name":"Civil"}
  ];
	return (
		<Navbar expand="lg" fixed="top" style={{backgroundColor: '#5d4949'}}>
  <Navbar.Brand href="#home" style={{}}>
				<Link
					to="/home"
					style={{ textDecoration: 'none', color: 'navajowhite', fontSize: 'larger', fontWeight: '600' }}
					className="logo-name font-weight-bold "
				>
					GratiS'{' '}
				</Link>
			</Navbar.Brand>
      <NavDropdown title={<i className="fa fa-filter" aria-hidden="true" style={{fontSize: 'x-large'}}></i>} 
      id="basic-nav-dropdown" alignRight>
        {
          options.map(elem=><a className="dropdown-item nav-items" onClick={()=>fetchPost(elem.name)} style={{fontWeight: '600'}}>{elem.value}</a>)
        }
      </NavDropdown>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" 
      style={{ textDecoration: 'none', color: '#f5f7f9', fontSize: 'larger', fontWeight: '600' }}
        >Home</Link>     
      <Link to="/profile" 
      style={{ textDecoration: 'none', color: '#f5f7f9', fontSize: 'larger', fontWeight: '600' }}
        >Profile</Link>
    </Nav>
    <Form inline>
	  {isLoggedIn&&<Button variant="outline-success" style={{margin: '5px'}} onClick={logout}>Logout</Button>}
    </Form>
  </Navbar.Collapse>
</Navbar>
			
	);
}

export default NavbarMainComponent;