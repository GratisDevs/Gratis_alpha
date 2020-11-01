import React from 'react';
<<<<<<< HEAD
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import { connect } from 'react-redux';
import { logout, login } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
=======

import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import {connect} from 'react-redux';
import {logout, login} from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter} from 'react-router-dom';
>>>>>>> d45e1a173b90374cdb504e67199d8218c1a412c8
import Homepage from './components/react-components/Homepage.js';
import NavbarMainComponent from './components/navbar_components/navbarmaincomponent';

class App extends React.Component {
	constructor(props) {
		super(props);
<<<<<<< HEAD
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
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
			<div className="App">
				<NavbarMainComponent />
				<Switch>
					<Route
						exact
						path="/"
						component={() => <Homepage userName={this.props.userName} logout={this.logout} />}
					/>
					<Route exact path="/login" component={Login} />
				</Switch>
			</div>
		);
=======
		
		
	}	
	
	componentDidMount(){
		console.log("App.js's component mounted");
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.props.dispatch(login(user.email));	
				this.props.history.push("/");
			}
			
		})	
	}

	logout=()=>{
		console.log("clicked");
		firebase.auth().signOut().then(()=>{
			this.props.dispatch(logout());
			this.props.history.push("/login");
		}).catch((err)=>{
			console.log(err);
		})
>>>>>>> d45e1a173b90374cdb504e67199d8218c1a412c8
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName
	};
};

export default withRouter(connect(mapStateToProps)(App));
