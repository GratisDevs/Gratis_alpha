import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function NavbarMainComponent() {
	return (
		<div>
			<Navbar bg="light" variant="light">
				<Navbar.Brand className="logo-name">GratiS</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-5">
					<div>
						<Nav className="mr-auto">
							<Nav.Link className="mr-2 active ">Home</Nav.Link>
							<Nav.Link className="mr-2 ">Login</Nav.Link>
						</Nav>
					</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarMainComponent;
