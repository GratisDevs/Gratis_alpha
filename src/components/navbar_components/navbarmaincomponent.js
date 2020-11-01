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
			<Navbar bg="light" variant="light" className="navbrand-center">
				<Nav.Link className="mr-2 active " href="/home">
					Home
				</Nav.Link>
				<div className="mx-auto ">
					<Navbar.Brand className="logo-name ">GratiS'</Navbar.Brand>
				</div>
				<Nav.Link className="mr-2 active " href="/login">
					Login
				</Nav.Link>
			</Navbar>
		</div>
	);
}

export default NavbarMainComponent;
