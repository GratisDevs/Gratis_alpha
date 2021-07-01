import React from 'react';
import { db } from '../data_components/firebase';

class AuthorProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            src: ''
        }
    }
    componentDidMount(){
        db.collection("users").where("uid","==",this.props.uid).get().then(query=>{
            const doc=query.docs[0];
            this.setState({
                src: doc.data().photoURL
            })
        })
    }

    render(){
        return(
            <img src={this.state.src} alt="" style={{width: '45px', height: '45px', borderRadius: '50%'}} />
        );
    }
}

export default AuthorProfile;