import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            cPassword: '',
            alert_pop: false
        };
    }

    
    handleInputchange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleAuthentication = async() => {

        if(this.state.password !== this.state.cPassword)
            await this.setState({ alert_pop: true });
        else
            await this.setState({ alert_pop: false });

        
        if(this.state.alert_pop===true){
            swal("","Password should match with the confirmation password","error");
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
                                                                    name="email"
                                                                    value={this.state.email}
                                                                    onChange={this.handleInputchange}
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
                                                                    name="password"
                                                                    value={this.state.password}
                                                                    onChange={this.handleInputchange}
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
                                                                    name="cPassword"
                                                                    value={this.state.conf_pass}
                                                                    onChange={this.handleInputchange}
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
