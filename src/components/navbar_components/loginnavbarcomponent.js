import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LoginNavbarComponent({ isLoggedIn, logout }) {
	return (
		<div className="navbar_bg">
			<Card className="card-navbar navbar_bg">
				<Container>
					<Row className="justify-content-center">
						<Col md={4} className="mx-auto mb-2 mt-2">
							<Link to="/login" style={{ textDecoration: 'none', color: 'beige' }}>
								<h2 className="text-center logo-name-login font-weight-bold ">GratiS' </h2>
							</Link>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
}

export default LoginNavbarComponent;

/**
 * 
 * 
 * 
 * 
 <Navbar expand="lg" fixed="top" style={{ backgroundColor: 'white' }}>
			<div className="d-flex justify-content-center">
				<h2 className="logo-name-login font-weight-bold ">GratiS' </h2>
				<Navbar.Brand href="#home" style={{}}>
					<Link to="/home" style={{ textDecoration: 'none', color: 'blueviolet' }} />
				</Navbar.Brand>
			</div>
		</Navbar>
 * 			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="profile">Your Profile</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success" style={{ margin: '5px' }}>
						Search
					</Button>
					{isLoggedIn && (
						<Button variant="outline-success" style={{ margin: '5px' }} onClick={logout}>
							Logout
						</Button>
					)}
				</Form>
			</Navbar.Collapse>
 */
