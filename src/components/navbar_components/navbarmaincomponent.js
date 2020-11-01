import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function NavbarMainComponent() {
	return (
		<div>
			<Navbar bg="light" variant="light" className="navbrand-center">
				<Nav.Link style={{ textDecoration: 'none' }} className="mr-2 active text-dark " href="/home">
					Home
				</Nav.Link>
				{'  '}
				<Dropdown as={ButtonGroup}>
					<Button variant="light">Sub - Gratis Topics</Button>
					<Dropdown.Toggle split variant="dark" id="dropdown-custom-2" />
					<Dropdown.Menu className="super-colors">
						<Dropdown.Item eventKey="1">Action</Dropdown.Item>
						<Dropdown.Item eventKey="2">Another action</Dropdown.Item>
						<Dropdown.Item eventKey="3" active>
							Active Item
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<div className="mx-auto ">
					<Navbar.Brand className="logo-name ">GratiS'</Navbar.Brand>
				</div>
				<Nav.Link style={{ textDecoration: 'none' }} className="mr-2 active  text-dark" href="/login">
					Login
				</Nav.Link>
			</Navbar>
		</div>
	);
}

export default NavbarMainComponent;
