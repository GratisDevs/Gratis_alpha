import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {auth,db} from '../data_components/firebase.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import GoogleButton from 'react-google-button';
import LoginNavbarComponent from '../navbar_components/loginnavbarcomponent';
import firebase from '../data_components/firebase';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	registerUser=(props)=>{
		
		db.collection("users").where("displayName","==",props.displayName).get().then(querySnapshot=>{
			
			if(querySnapshot.size===0){
				db.collection("users").doc().set({
					displayName: props.displayName,
					photoURL: props.photoURL,
					uid: props.uid,
					likes: [],
					heart: [],
					email: props.email
				}).catch(err=>{console.log(err)});
			}
		})
	}

	handleEmail = (event) => {
		this.setState({ email: event.target.value });
	};

	handlePassword = (event) => {
		this.setState({ password: event.target.value });
	};
	handleAuthentication = () => {
		auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
			auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
				//this.props.dispatch(login(user.user.email.split("@")[0],"",user.user.email))
			}, function(error) {
				swal('', error.message, 'error');
			});
		});
	};

	handleGoogleValidation = () => {
		auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
			auth
				.signInWithPopup(new firebase.auth.GoogleAuthProvider())
				.then((result) => {
				
					this.registerUser({displayName: result.user.displayName,
						photoURL: result.user.photoURL,email: result.user.email,uid: result.user.uid})
					//this.props.dispatch(login(result.user.displayName,result.user.photoURL,result.user.email));
				})
				.catch((err) => {
					console.log(err);
				});
		});
	};

	render() {
		if (this.props.userName !== ''&&this.props.location.state!==undefined) return <Redirect to={this.props.location.state.pathname} />;
		else if(this.props.userName !== ''&&this.props.location.pathname==='/login') return <Redirect to={'/'} />
		return (
			<>
			<LoginNavbarComponent />
			<div>
				<Container fluid className="login_bg">
					<Row className="justify-content-center">
						<Col sm={11} className="mx-auto">
							<Container flex="true">
							<hr className="hr_white"/>
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
																		<h6>
																			<Link
																				to="/forgot_pass"
																				style={{
																					textDecoration: 'none'
																				}}
																			>
																				Forgot Password
																			</Link>
																		</h6>
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
															<Container>
																<Row className="justify-content-center">
																	<Col md={6} className="mx-auto ">
																		<GoogleButton
																			onClick={this.handleGoogleValidation}
																			label="Sign In"
																			type="dark"
																			style={{ marginTop: '8px', width: '100%' }}
																		/>
																	</Col>
																</Row>
															</Container>
															<div>
																<Link
																	to="/register"
																	style={{
																		textDecoration: 'none',
																		color: 'white'
																	}}
																>
																	<Form.Text className="text-info slogan-2 ml-1 pt-2 pb-2 text-center">
																		<h6>New User? Sign Up</h6>
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
			</div>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName
});

export default withRouter(connect(mapStateToProps)(Login));