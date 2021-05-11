import React from 'react';
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import Register from './components/react-components/Register';
import ForgotPass from './components/react-components/ForgotPass';
import { connect } from 'react-redux';
import { logout, login } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Homepage from './components/react-components/Homepage.js';
import NavbarMainComponent from './components/navbar_components/navbarmaincomponent';

class App extends React.Component {
	

	componentDidMount() {
		console.log("inside app.js");
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(user+" hello");
				this.props.dispatch(login(user.email));
				this.props.history.push('/');
			}
		});
	}
	logout = () => {
		console.log('clicked');
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
	render() {
		return (
			<>
				<NavbarMainComponent logout={this.logout} />
				<Switch>
					<Route
						exact
						path="/"
						component={() => <Homepage userName={this.props.userName} />}
					/>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgot_pass" component={ForgotPass} />
					<Redirect to="/" />
				</Switch>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName
	};
};

export default withRouter(connect(mapStateToProps)(App));
