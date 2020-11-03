import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { login } from '../../actions/login_logout.js';
import firebase from '../data_components/firebase.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidMount() {
		console.log('Login component mounted');
	}

	handleEmail = (event) => {
		this.setState({ email: event.target.value });
	};

	handlePassword = (event) => {
		this.setState({ password: event.target.value });
	};
	handleAuthentication = () => {
		firebase
			.auth()
			.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			.then(() => {
				firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
					this.props.dispatch(login(firebase.auth().currentUser.email));
				}, function(error) {
					console.log(error);
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	handleEmailValidation = () => {};

	render() {
		if (this.props.userName !== '') return <Redirect to="/" />;
		return (
			<div>
				<Container>
					<Row>
						<Col>
							<Container>
								<br />
								<br />
								<br />
								<Row>
									<Col md={6}>
										<div className="gra-chan_login" />
									</Col>
									<Col md={6}>
										<Container>
											<Row>
												<Col md={10}>
													<br />
													<br />
													<br />
													<Card>
														<br />
														<div className="mx-auto">
															<h3 className="logo-name text-danger font-weight-bold">
																Login
															</h3>
														</div>
														<br />

														<Card.Body>
															<Form>
																<Form.Group controlId="formEmail">
																	<Form.Label className="slogan-2 text-danger">
																		Enter your email address
																	</Form.Label>
																	<Form.Control
																		type="email"
																		value={this.state.email}
																		onChange={this.handleEmail}
																		placeholder="Email"
																		className="slogan-2 "
																	/>
																</Form.Group>
																<Form.Group controlId="formPassword">
																	<Form.Label className="slogan-2 text-danger">
																		Password
																	</Form.Label>
																	<Form.Control
																		type="password"
																		value={this.state.password}
																		onChange={this.handlePassword}
																		placeholder="Password"
																		className="slogan-2 "
																	/>
																</Form.Group>
																<Button
																	variant="primary"
																	id="submitButton"
																	className="mt-3 slogan-2"
																	onClick={this.handleAuthentication}
																>
																	Login
																</Button>
															</Form>
															<br />
															<br />
														</Card.Body>
													</Card>
												</Col>
											</Row>
										</Container>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName
	};
};

export default connect(mapStateToProps)(Login);

/**
 * <input type="email" value={this.state.email} onChange={this.handleEmail} />
										<input
											type="password"
											value={this.state.password}
											onChange={this.handlePassword}
										/>
										<button onClick={this.handleAuthentication}>Login</button>
 */
