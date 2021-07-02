import React from 'react';
import TextField from '@material-ui/core/TextField';
import { db } from '../data_components/firebase';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import BallLoader from './BallLoader';
import { withStyles } from '@material-ui/styles';


class UserSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
            isLoading: false,
            search: ''
        }
    }

    searchUsers=()=>{
        if(this.state.search.length>=2){
            this.setState({
                isLoading: true
            })
            db.collection("users").where("displayName",">=",this.state.search).
            where("displayName","<=",this.state.search+"\uf8ff")
            .get().then(query=>{
                const user=query.docs;
                this.setState({
                    users: user,
                    isLoading: false
                })
            })
        }
        else{
            this.setState({
                users: [],
                isLoading: false
            })
        }
    }
    render(){
        return(
            <div className="container-fluid">
            <div className="row" style={{marginTop: '100px'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h4 style={{marginBottom: '10px'}}>Search For Users</h4>
                    <TextField id="outlined-basic" label="Search Users" 
                    value={this.state.search}
                    onChange={(ev)=>this.setState({search: ev.target.value})}
                    variant="outlined" 
                    fullWidth="true"
                    onKeyUp={()=>this.searchUsers()} />
                    {this.state.isLoading?<BallLoader />:(<div style={{display: 'flex', flexDirection: 'column', marginTop: '30px'}}>
                        {
                            this.state.users.map(user=>{
                                var data=user.data();
                                return(
                                    <>
                                    <div style={{display: 'flex', justifyContent: 'left'}}>
                                        <Link to={`/profile/${data.uid}`} style={{display: 'flex'}}><UserProfile userProfile={data.photoURL} />
                                        <h6 style={{paddingTop: '20px', marginLeft: '10px'}}>{data.displayName}</h6></Link>
                                    </div>
                                    <hr />
                                    </>
                                );
                            })
                        }
                    </div>)}
                </div>
                <div className="col-md-3"></div>
            </div>
            </div>
        );
    }
}

export default UserSearch;