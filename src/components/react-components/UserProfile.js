import React from 'react';

class UserProfile extends React.Component{
    render(){
        var src=this.props.userProfile?this.props.userProfile:'/images/user.svg'
        return(
            <img src={src} 
            style={{marginTop: '8px', height: '45px', width: '45px', borderRadius: '50%'}} alt="" />
        );
    }
}

export default UserProfile;