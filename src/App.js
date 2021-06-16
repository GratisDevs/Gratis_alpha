import React from 'react';
import {auth,db} from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import Register from './components/react-components/Register';
import ForgotPass from './components/react-components/ForgotPass';
import { connect } from 'react-redux';
import { logout, login, changeLoading } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Homepage from './components/react-components/Homepage.js';
import Home from './components/react-components/Home.js';
//import firebase from './components/data_components/firebase';
//import Profile from './components/react-components/Profile.js';
import NavbarMainComponent from './components/navbar_components/navbarmaincomponent';
import LoginNavbarComponent from './components/navbar_components/loginnavbarcomponent.js';
import { useLocation } from 'react-router-dom';
import firebase from '../src/components/data_components/firebase';


import { fetchPosts } from './actions/PostHandle.js';
import PostPage from './components/react-components/PostPage.js';
//import { Messaging } from './Messaging';
//import { requestFirebaseNotificationPermission } from './firebaseInit';

class App extends React.Component {

	changeUser=async()=>{
		const token=await firebase.messaging().getToken();
		console.log(token);
	}

	

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection("users").where("email","==",user.email).get().then(query=>{
					const doc=query.docs[0];
					var URL,email,uid;
					if(doc)
					{URL=doc.data().photoURL;
					email=doc.data().email;
					uid= doc.data().uid;}
					else{
						URL=user.photoURL;
						email=user.email;
						uid=user.uid;
					}
					if(user.displayName)
						this.props.dispatch(login(user.displayName, URL, email, uid));
					else
						this.props.dispatch(login(user.email.split("@")[0], URL, email, uid));
				})
				
			}
			else{
				this.props.dispatch(changeLoading());
			}
			this.changeUser()
		});	
	}

	
	fetchPosts=()=>{
		this.props.dispatch(fetchPosts());
	}
	logout = () => {
		auth.signOut()
			.then(() => {
				this.props.dispatch(logout());
				this.props.history.push('/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		console.log(this.props.location.pathname)
		
		return (
			<>
				
				<Switch>
					<Route exact path="/" render={(props)=><Home {...props} isLoggedIn={this.props.isLoggedIn} 
					userName={this.props.userName} 
					fetchPosts={this.fetchPosts}
					photoURL={this.props.photoURL} 
					logout={this.logout} />} 
					 />
					<Route exact path="/login" component={Login} />
					<Route exact path="/post/:id" render={(props)=><PostPage {...props} uid={this.props.uid} logout={this.logout} />} />
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
		photoURL: state.userState.photoURL,
		uid: state.userState.uid
	};
};

export default withRouter(connect(mapStateToProps)(App));
