import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function NavbarMainComponent() {
	return (
		<div>
			<Navbar bg="light" variant="light">
				<Nav.Link className="mr-2 active " href="/home">
					Home
				</Nav.Link>
				<Navbar.Brand className="logo-name mx-auto">GratiS'</Navbar.Brand>
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-5">
					<div>
						<Nav className="mr-auto">
							<Nav.Link className="mr-2 ">Login</Nav.Link>
						</Nav>
					</div>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarMainComponent;
