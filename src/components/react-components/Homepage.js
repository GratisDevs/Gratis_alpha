import React from 'react';
import { Redirect } from 'react-router';
import './Home.css';
import Leftside from './Leftside.js';
import Rightside from './Rightside.js';
import Main from './Main.js';
import Recommendation from './recommendation.js';



class Homepage extends React.Component{

    
    
    render(){
        if(this.props.userName==='') return <Redirect to="/login" />
        return(
            <div className="container-fluid m-0" style={{paddingTop: '100px',paddingLeft: '0',paddingRight: '0'}}>
                <div className="row m-0">
                    <Leftside userName={this.props.userName} />
                    <Recommendation />
                    <Main userName={this.props.userName} />
                    <Rightside />
                </div>
                
            </div>
        );
    }
}

export default Homepage; 