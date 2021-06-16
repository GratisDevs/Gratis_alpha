import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';
import './img.css';

 function Loading(props){
    if(!props.isLoading) return <Redirect to={{
        pathname: "/login",
        state: { pathname: props.location.pathname }
    }} />
    return(
        <div class="row" style={{marginTop: '100px'}}>
            <div class="col-md-12" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                    <img class="loader" src="/images/DP.jpg" style={{height: '60px', width: '60px', borderRadius: '50%'}} />
            </div>
        </div>
    );
}

const mapStateToProps=(state)=>({
    isLoading: state.userState.isLoading
})

export default withRouter(connect(mapStateToProps)(Loading));