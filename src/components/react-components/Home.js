import React from 'react';
import Homepage from './Homepage';
import Loading from './Loading';


class Home extends React.Component{
    
    render(){
        return(
            this.props.isLoggedIn?<Homepage userName={this.props.userName} 
            fetchPosts={this.props.fetchPosts} logout={this.props.logout} 
            uid={this.props.uid} photoURL={this.props.photoURL} />:<Loading />
        );
    }
}

export default Home;