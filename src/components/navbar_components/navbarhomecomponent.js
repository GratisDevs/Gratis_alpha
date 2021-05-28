import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import firebase from '../data_components/firebase.js';

const handleBurger = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
	nav.classList.toggle('nav-active');

	// Animate Links
	navLinks.forEach((link, index) => {
		if (link.style.animation) {
			link.style.animation = '';
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
		}
	});

	//Burger Animation
	burger.classList.toggle('toggle');
};

const logout = () => {
	console.log('Logout is clicked');
	firebase
		.auth()
		.signOut()
		.then(() => {
			this.props.dispatch(logout());
			this.props.history.push('/login');
		})
		.catch((err) => {
			console.log(err);
		});
};

function NavbarHomeComponent({ isLoggedIn, logout }) {
	return (
		<nav>
			<div className="logo">
				<Link to="/home" style={{ textDecoration: 'none', color: 'beige' }}>
					<h2 className=" nav-logo ">GratiS' </h2>
				</Link>
			</div>
			<ul className="nav-links">
				<li>
					<Link to="/home" style={{ textDecoration: 'none' }} className="navi-links">
						Home
					</Link>
				</li>
				<li>
					<Link to="/home" style={{ textDecoration: 'none' }} className="navi-links">
						Home
					</Link>
				</li>
				<li>
					<Link to="/home" style={{ textDecoration: 'none' }} className="navi-links">
						Home
					</Link>
				</li>
				<li>
					<Button variant="outline-success" style={{ margin: '5px' }} onClick={logout}>
						Logout
					</Button>
				</li>
			</ul>
			<div className="burger" onClick={handleBurger}>
				<div className="line1" />
				<div className="line2" />
				<div className="line3" />
			</div>
		</nav>
	);
}

export default NavbarHomeComponent;

/* 

<Form inline>
						<InputGroup className=" mr-sm-2">
							<FormControl type="text" placeholder="Search posts" id="search-bar" />
							<InputGroup.Append>
								<Button variant="outline-success">
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 25 25">
										<path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
									</svg>
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Form>


<Container fluid>
				<Row className="">
					<Col md={4} className="mx-2 my-2">
						<Link to="/login" style={{ textDecoration: 'none', color: 'beige' }}>
							<h2 className=" navbar_logo_home font-weight-bold ">GratiS' </h2>
						</Link>
					</Col>
                    <Col>

                    </Col>
				</Row>
			</Container>


<Navbar expand="lg" fixed="top" style={{ backgroundColor: 'white' }}>
    <Navbar.Brand href="#home" style={{}}>
        <Link
            to="/home"
            style={{ textDecoration: 'none', color: 'blueviolet' }}
            className="logo-name font-weight-bold "
        >
            GratiS'{' '}
        </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="profile">Your Profile</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        console.log('action clicked');
                    }}
                >
                    Action
						</NavDropdown.Item>
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
</Navbar> */
