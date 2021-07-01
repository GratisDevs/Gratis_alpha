import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {auth,db} from '../data_components/firebase.js';
import firebase from '../data_components/firebase.js';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoginNavbarComponent from '../navbar_components/loginnavbarcomponent.js';
import swal from 'sweetalert';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avaName: '',
            uEmail: '',
            uPassword: '',
        };
    }

    registerUser=(props)=>{
		//console.log(props);
		
		db.collection("users").doc().set({
			displayName: props.displayName,
			photoURL: props.photoURL,
            uid: props.uid,
			likes: [],
            heart: [],
			email: props.email
		}).then(()=>{
			//this.props.dispatch(login(props.displayName,props.photoURL,props.email));
		}).catch(err=>{console.log(err)});
	}

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleAuthentication = () => {
        auth
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                auth.createUserWithEmailAndPassword(this.state.uEmail, this.state.uPassword).then((user) => {
                    this.registerUser({displayName: user.user.email.split("@")[0],photoURL: "",
                    email: user.user.email, uid: user.user.uid})
                }, function (error) {
                    swal("",error.message,"error");
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    handleEmailValidation = () => { };

    render() {
        if (this.props.userName !== '') return <Redirect to="/" />;
        return (
            <div>
                <LoginNavbarComponent></LoginNavbarComponent>
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

                                                    <Card bg="transparent" className="card-login">
                                                        <br />
                                                        <div className="mx-auto">
                                                            <h3 className="logo-name text-danger font-weight-bold">
                                                                Sign Up
														</h3>
                                                        </div>
                                                        <br />

                                                        <Card.Body>
                                                            <Form bg="transparent">
                                                                <Form.Group controlId="formAvatar" bg="transparent">
                                                                    <Form.Label className="slogan-2 text-danger">
                                                                        Enter your avatar name
																</Form.Label>
                                                                    <Form.Control
                                                                        type="name"
                                                                        name="avaName"
                                                                        value={this.state.userName}
                                                                        onChange={this.handleInputChange}
                                                                        placeholder="Avatar"
                                                                        className="slogan-2 "
                                                                        bg="warning"
                                                                    />
                                                                </Form.Group>
                                                                <Form.Group controlId="formEmail" bg="transparent">
                                                                    <Form.Label className="slogan-2 text-danger">
                                                                        Enter your email address
																</Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        name="uEmail"
                                                                        value={this.state.uEmail}
                                                                        onChange={this.handleInputChange}
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
                                                                        name="uPassword"
                                                                        value={this.state.uPassword}
                                                                        onChange={this.handleInputChange}
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
                                                            <div>
                                                                <Link
                                                                    to="/login"
                                                                    style={{
                                                                        textDecoration: 'none',
                                                                        color: 'white'
                                                                    }}
                                                                >
                                                                    <Form.Text className="text-info slogan-2 ml-1 pt-2 pb-2 text-center">
                                                                        <h6>Already a user? Sign In</h6>
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
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userState.isLoggedIn,
        userName: state.userState.userName
    };
};

export default connect(mapStateToProps)(Register);

/**
 *
 */
