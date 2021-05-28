import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Form, InputGroup, FormControl, Dropdown, ButtonGroup } from 'react-bootstrap';

class NavbarHomeComponent extends React.Component {
	handleBurger = () => {
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

	render() {
		return (
			<nav>
				<div className="logo">
					<Link to="/home" style={{ textDecoration: 'none', color: 'beige' }}>
						<h2 className=" nav-logo ">GratiS' </h2>
					</Link>
				</div>

				<ul className="nav-links">
					<Dropdown as={ButtonGroup}>
						<Button variant="transparent" style={{ textDecoration: 'none', color: 'white' }}>
							Sub-Grachas
						</Button>

						<Dropdown.Toggle split variant="transparent" id="dropdown-split-basic" />

						<Dropdown.Menu>
							<Form className="ml-3 mr-3">
								<Form.Group controlId="searchItem">
									<Form.Control type="text" placeholder="Search" />
								</Form.Group>
							</Form>
							<Dropdown.Item href="#/action-2">Founders</Dropdown.Item>
							<Dropdown.Item href="#/action-3">AskME</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<li>
						<Link to="/home" style={{ textDecoration: 'none' }} className="navi-links">
							Home
						</Link>
					</li>
					<li>
						<Link to="/profile" style={{ textDecoration: 'none' }} className="navi-links">
							Profile
						</Link>
					</li>
					<li style={{ textDecoration: 'none' }} className="navi-links" onClick={this.props.logout}>
						Logout
					</li>
				</ul>
				<div className="burger" onClick={this.handleBurger}>
					<div className="line1" />
					<div className="line2" />
					<div className="line3" />
				</div>
			</nav>
		);
	}
}

export default NavbarHomeComponent;
