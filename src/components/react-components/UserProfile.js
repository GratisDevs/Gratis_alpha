import React from 'react';

class UserProfile extends React.Component{
    render(){
        return(
            <img src={this.props.userProfile} style={{marginTop: '8px'}} alt="" />
        );
    }
}

export default UserProfile;