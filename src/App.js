import React from 'react';
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import Register from './components/react-components/Register';
import ForgotPass from './components/react-components/ForgotPass';
import { connect } from 'react-redux';
import { logout, login, changeLoading } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Homepage from './components/react-components/Homepage.js';
import Home from './components/react-components/Home.js';
import Profile from './components/react-components/Profile.js';


import { fetchPosts } from './actions/PostHandle.js';

class App extends React.Component {

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				if(user.displayName&&user.photoURL&&user.email)
					this.props.dispatch(login(user.displayName, user.photoURL, user.email));
				else
					this.props.dispatch(login(user.email.split("@")[0], "", ""));
				
			}
			else{
				this.props.dispatch(changeLoading());
			}
		});
	}
	fetchPosts=()=>{
		this.props.dispatch(fetchPosts());
	}
	logout = () => {
		
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
				
				
				<Switch>
					<Route exact path="/" component={()=><Home isLoggedIn={this.props.isLoggedIn} 
					userName={this.props.userName} 
					fetchPosts={this.fetchPosts} />} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/profile" component={Profile} />
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
		userName: state.userState.userName,
		email: state.userState.email,
		photoURL: state.userState.photoURL
	};
};

export default withRouter(connect(mapStateToProps)(App));


// line 54

// {
// 	this.props.isLoggedIn ? (
// 		<NavbarHomeComponent isLoggedIn={this.props.isLoggedIn} logout={this.logout} />
// 	) : <LoginNavbarComponent></LoginNavbarComponent>
// }