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
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            conf_pass: '',
            alert_pop: false
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

    handleConfPassword = (event) => {
        this.setState({ conf_pass: event.target.value });
    };

    handleAuthentication = () => {

        if(this.state.password !== this.state.conf_pass)
            this.setState({ alert_pop: true });
        else
            this.setState({ alert_pop: false });
        
        if(this.state.alert_pop === true){
            alert("Password should match with the confirmation password");
        }
        else{
            //this.props.history.push('/login');
        }

        
    };

    handleEmailValidation = () => { };

    render() {
        if (this.props.userName !== '') return <Redirect to="/" />;
        return (
            <Container fluid className="login_bg">
                <Row className="justify-content-center">
                    <Col sm={11} className="mx-auto">
                        <Container flex>
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
                                                            <Form.Group controlId="formConfPass" bg="transparent">
                                                                <Form.Label className="slogan-2 text-danger">
                                                                    Confirm Password
																</Form.Label>
                                                                <Form.Control
                                                                    type="password"
                                                                    value={this.state.conf_pass}
                                                                    onChange={this.handleConfPassword}
                                                                    placeholder="Confirm Password"
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
                                                                    <h7>Already a user? Sign In</h7>
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

export default connect(mapStateToProps)(Register);

/**
 *
 */
