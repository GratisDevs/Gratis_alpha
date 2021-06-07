import React from 'react';
import {db} from '../data_components/firebase';

class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            src: '/images/user.svg'
        }
    }
    componentDidMount(){
        db.collection("users").where("uid","==",this.props.uid).get().then(query=>{
            const user=query.docs[0];
            const URL=user.data().photoURL;
            if(URL!=="")
                this.setState({
                    src: URL
                });
        })
    }
    render(){
        return(
            <img src={this.state.src} style={{marginTop: '8px'}} />
        );
    }
}

export default UserProfile;