import React from 'react';
import './App.css';
import firebase from './components/data_components/firebase.js';
import Login from './components/react-components/Login.js'
import {connect} from 'react-redux';
import {logout, login} from './actions/login_logout.js';
import { Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Homepage from './components/react-components/Homepage.js';


class App extends React.Component{

	constructor(props){
		super(props);
		
	}	
	
	componentDidMount(){
		let user1;
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				user1=user;
				this.props.dispatch(login(user.email));	
			}
			
			
		})
		if(user1===undefined)
		this.props.history.push("/login");
	}
	logout=()=>{
		console.log("clicked");
		firebase.auth().signOut().then(()=>{
			this.props.dispatch(logout());
		}).catch((err)=>{
			console.log(err);
		})
	}
	render(){
		return (<div className="App">
			<Switch>
				<Route exact path="/" component={()=><Homepage userName={this.props.userName} logout={this.logout}/>} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</div>);}
}

const mapStateToProps=(state)=>{
	return{
		isLoggedIn: state.userState.isLoggedIn,
		userName: state.userState.userName
	};
}


export default withRouter(connect(mapStateToProps)(App));
