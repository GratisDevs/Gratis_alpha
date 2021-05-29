import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

 function Loading(props){
    if(!props.isLoading) return <Redirect to="/login" />
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

export default connect(mapStateToProps)(Loading);