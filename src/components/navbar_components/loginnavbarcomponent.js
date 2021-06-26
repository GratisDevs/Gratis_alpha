import React from 'react';
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

