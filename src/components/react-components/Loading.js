import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router-dom';

 function Loading(props){
    if(!props.isLoading) return <Redirect to={{
        pathname: "/login",
        state: { pathname: props.location.pathname }
    }} />
    return(
        <div class="row" style={{marginTop: '100px'}}>
            <div class="col-md-12" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            </div>
        </div>
    );
}

const mapStateToProps=(state)=>({
    isLoading: state.userState.isLoading
})

export default withRouter(connect(mapStateToProps)(Loading));