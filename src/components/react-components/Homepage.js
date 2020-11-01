import React from 'react';
import { Redirect } from 'react-router';

class Homepage extends React.Component{
    render(){
        if(this.props.userName==='') return <Redirect to="/login" />
        return(
            <>
                <h2>Homepage {this.props.userName}</h2>
                <p>If you are viewing this, it means you are logged in to the app.</p>
                <button onClick={this.props.logout}>Logout</button>
            </>
        );
    }
}
export default Homepage; 