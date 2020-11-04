import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../actions/login_logout.js';
import firebase from '../data_components/firebase.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
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
					swal("",error.message,"error");
				});
			});
	};

	handleEmailValidation = () => {};

	render() {
		if (this.props.userName !== '') return <Redirect to="/" />;
		return (
			<Container fluid className="login_bg">
				<Row className="justify-content-center">
					<Col sm={11} className="mx-auto">
						<Container flex="true">
							<br />
							<br />
							<br />
							<Row className="justify-content-center">
								<Col md={6}>
									<div className="gra-chan_login d-none d-md-block" />
								</Col>
								<Col md={6} className="my-auto">
									<Container>
										<Row className="justify-content-center">
											<Col md={10} className="mx-auto">
												<br />
												<br />
												<br />
												<Card bg="transparent" className="card-login">
													<br />
													<div className="mx-auto">
														<h3 className="logo-name text-danger font-weight-bold">
															Login
														</h3>
													</div>
													<br />

													<Card.Body>
														<Form bg="transparent">
															<Form.Group controlId="formEmail" bg="transparent">
																<Form.Label className="slogan-2 text-danger">
																	Enter your email address
																</Form.Label>
																<Form.Control
																	type="email"
																	value={this.state.email}
																	onChange={this.handleEmail}
																	placeholder="Email"
																	className="slogan-2 "
																	bg="warning"
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
															<div>
																<Form.Text className="text-info slogan-2 ml-1 pt-2 pb-2">
																	<h5>
																		<Link
																			to="/forgot_pass"
																			style={{
																				textDecoration: 'none'
																			}}
																		>
																			Forgot Password
																		</Link>
																	</h5>
																</Form.Text>
															</div>
															<Button
																variant="primary"
																id="submitButton"
																className="mt-3 slogan-2"
																onClick={this.handleAuthentication}
															>
																Login
															</Button>
														</Form>
														<div>
															<Link
																to="/register"
																style={{
																	textDecoration: 'none',
																	color: 'white'
																}}
															>
																<Form.Text className="text-info slogan-2 ml-1 pt-2 pb-2 text-center">
																	<h5>New User? Sign Up</h5>
																</Form.Text>
															</Link>
														</div>
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
 * 
 */
