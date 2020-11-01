import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import {login} from '../../actions/login_logout.js';
import firebase from '../data_components/firebase.js';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        };
        
    }

    handleEmail=(event)=>{
        this.setState({email:event.target.value});
    }

    handlePassword=(event)=>{
        this.setState({password:event.target.value});
    }
    handleAuthentication=()=>{
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
            firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((user)=>{
                this.props.dispatch(login(firebase.auth().currentUser.email));
                this.props.history.push("/");
            },function(error){
                console.log(error);
            })
        }).catch((error)=>{
            alert(error.message);
        })
    }
    render(){
        if(this.props.userName!=='') return <Redirect to="/" />
        return(
            <>
            <input type="email" value={this.state.email} onChange={this.handleEmail} />
            <input type="password" value={this.state.password} onChange={this.handlePassword} />
            <button onClick={this.handleAuthentication}>Login</button>
            </>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        isLoggedIn: state.userState.isLoggedIn,
        userName: state.userState.userName
    }
}

export default connect(mapStateToProps)(Login);