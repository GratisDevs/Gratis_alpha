import React from 'react';
import { Redirect } from 'react-router';



class Homepage extends React.Component{

    componentDidMount(){
        console.log("Homepage Opened");
      
    }
    
    render(){
        if(this.props.userName==='') return <Redirect to="/login" />
        return(
            <>
            <h1>Hello</h1>
            </>
        );
    }
}
export default Homepage; 