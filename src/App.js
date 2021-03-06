import React from 'react';
import {auth,db} from './components/data_components/firebase.js';
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js';
import Register from './components/react-components/Register';
import ForgotPass from './components/react-components/ForgotPass';
import { connect } from 'react-redux';
import { logout, login, changeLoading } from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Home from './components/react-components/Home.js';
import { fetchPosts } from './actions/PostHandle.js';
import PostPage from './components/react-components/PostPage.js';
import ProfilePage from './components/react-components/ProfilePage.js';
import NavbarMainComponent from './components/navbar_components/navbarhomecomponent.js';
import MainWikiComponent from './components/wiki_components/MainWikiComponent.js';
import UserSearch from './components/react-components/UserSearch.js';


class App extends React.Component {

	componentDidMount() {
		var isOfflineForDatabase = {
			state: 'offline',
			last_changed: firebase.database.ServerValue.TIMESTAMP,
		};
		
		var isOnlineForDatabase = {
			state: 'online',
			last_changed: firebase.database.ServerValue.TIMESTAMP,
		};
		auth.onAuthStateChanged((user) => {
			if (user) {
				var userStatusDatabaseRef = firebase.database().ref('/status/' + user.uid);
				firebase.database().ref('.info/connected').on('value', function(snapshot) {
    
					if (snapshot.val() === false) {
						return;
					};
				
					userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
						
						userStatusDatabaseRef.set(isOnlineForDatabase);
					});
				});
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
		});	
	}

	
	fetchPosts=(category)=>{
		this.props.dispatch(fetchPosts(category));
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
		
		
		return (
			<>
				{this.props.isLoggedIn&&<NavbarMainComponent logout={this.logout} fetchPost={this.fetchPosts} uid={this.props.uid} />}
				<Switch>
					<Route exact path="/" render={(props)=><Home {...props} 
					isLoggedIn={this.props.isLoggedIn} 
					userName={this.props.userName} 
					fetchPosts={this.fetchPosts}
					photoURL={this.props.photoURL} 
					logout={this.logout}
					uid={this.props.uid} />} 
					 />
					<Route exact path="/login" component={Login} />
					<Route exact path="/post/:id" render={(props)=><PostPage {...props} uid={this.props.uid} userName={this.props.userName} />} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgot_pass" component={ForgotPass} />
					<Route exact path="/profile/:id" render={(props)=><ProfilePage {...props} uid={this.props.uid} userName={this.props.userName} />} />
					<Route exact path="/wiki" render={(props)=><MainWikiComponent {...props} fetchPosts={this.fetchPosts} logout={this.logout} isLoggedIn={this.props.isLoggedIn} />} />
					<Route eact path="/userSearch" component={UserSearch} />
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
