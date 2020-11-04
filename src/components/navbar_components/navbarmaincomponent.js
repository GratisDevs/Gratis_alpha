import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function NavbarMainComponent() {
	return (
		<div className="border-bottom">
			<Navbar bg="transparent" variant="transparent">
				<Nav.Link style={{ textDecoration: 'none' }} className="mr-3 active text-dark " href="/home">
					Home
				</Nav.Link>
				{'  '}
				<Dropdown as={ButtonGroup} className="dropdown-border">
					<Button variant="transparent"> Sub - Grachas </Button>
					<Dropdown.Toggle split variant="transparent" id="dropdown-gracha" />
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
				<div className="mx-auto">
					<Navbar.Brand className="logo-name font-weight-bold " href="/home">
						GratiS'{' '}
					</Navbar.Brand>
				</div>

				<Button variant="transparent">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						className="message-icon"
					>
						<path d="M22 5v14h-20v-14h20zm2-2h-24v18h24v-18zm-2 16l-6.526-6.618-3.445 3.483-3.418-3.525-6.611 6.66 5.051-8-5.051-6 10.029 7.446 9.971-7.446-4.998 6.01 4.998 7.99z" />
					</svg>
					<Badge variant="transparent">9</Badge>
				</Button>
				<Nav.Link style={{ textDecoration: 'none' }} className="mr-2 active  text-dark" href="/login">
					Login
				</Nav.Link>
				<div className="ml-3 mr-5 ">User Area</div>
			</Navbar>
		</div>
	);
}

export default NavbarMainComponent;
