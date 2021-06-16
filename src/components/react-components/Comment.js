import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comment: '',
        }
    }
    submitComment=()=>{
        this.props.addComment(this.state.comment);
        this.setState({
            comment: ''
        });    
        
    }
    render(){
        return(
            <>

            <img src={this.props.userProfile} style={{width: '45px', height: '45px', borderRadius: '50%'}} />
            <TextField
            style={{width: '45%', margin: '0 10px', backgroundColor: '#fff'}}
            id="filled-basic"
            variant="filled"
            label="Comment"
            rowsMax={2}
            multiline
            placeholder="Write here ..."
            value={this.state.comment}
            onChange={(ev)=>this.setState({comment: ev.target.value})}
        />
        {!this.props.isLoading?(<Button variant="contained" color="primary" 
        style={{maxHeight: '45px', fontWeight: '700', borderRadius: '30px'}} onClick={this.submitComment}>
        Comment
      </Button>):<CircularProgress />}
      </>
        );
    }
}

export default Comment;