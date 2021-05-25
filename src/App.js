import React from 'react';
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import Register from './components/react-components/Register';
import ForgotPass from './components/react-components/ForgotPass';
import { connect } from 'react-redux';
import { logout, login } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Homepage from './components/react-components/Homepage.js';
import Profile from './components/react-components/Profile.js'
import NavbarMainComponent from './components/navbar_components/navbarmaincomponent';
import LoginNavbarComponent from './components/navbar_components/loginnavbarcomponent.js';

class App extends React.Component {
	
	constructor(){
		super();
		this.state = {
			loginState : false,
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				this.props.dispatch(login(user.displayName, user.photoURL, user.email));
				//this.props.history.push('/');
				this.setState({
					loginState: true
				});
			}
		});
	}
	logout = () => {
		
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.setState({
					loginState : false,
				});
				this.props.dispatch(logout());
				this.props.history.push('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		
		return (
			<>
				{ this.state.loginState ? (
					<NavbarMainComponent isLoggedIn={this.props.isLoggedIn} logout={this.logout} />
				) : <LoginNavbarComponent></LoginNavbarComponent>}
				
				<Switch>
					<Route
						exact
						path="/"
						component={() => <Homepage userName={this.props.userName} />}
					/>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgot_pass" component={ForgotPass} />
					<Route 
						exact 
						path="/profile" 
						component={()=><Profile 
										userName={this.props.userName} 
										email={this.props.email} 
										photoURL={this.props.photoURL} />} />
					<Redirect to="/" />
				</Switch>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName,
		email: state.userState.email,
		photoURL: state.userState.photoURL
	};
};

export default withRouter(connect(mapStateToProps)(App));
