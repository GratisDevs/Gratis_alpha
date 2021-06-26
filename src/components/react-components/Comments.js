import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {default as ModalButton} from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import OneComment from './OneComment';
import  Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import './Comments.css';

const useStyles = theme=>({
    paper:{
        height: '200px',
        overflowX: 'hidden'
    }
  });





class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deleteComment: false,
            commentId: '',
            selectedCommentId: '',
            isLoading: false,
            reply: '',
            replyDrawer: false
        }
    }

    toggleDeleteModal=(props)=>{
        this.setState({
            deleteComment: !this.state.deleteComment,
            commentId: props
        })
    }

    setSelectedComment=(commentId)=>{
        this.setState({
            selectedCommentId: commentId,
            replyDrawer: true
        })
    }

    deleteReply=(id)=>{
        fetch('http://snaptok.herokuapp.com/deleteReply',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({_id: this.props.postId, commentId: this.state.selectedCommentId,
            replyId: id})
        }).then(res=>res.json()).then(res=>{
            this.props.removeReply(this.state.selectedCommentId, id);
        }).catch(err=>console.log(err));
    }

    submitReply=()=>{
        this.setState({
            isLoading: true
        })
        fetch('http://snaptok.herokuapp.com/postReply',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({_id: this.props.postId, commentId: this.state.selectedCommentId,
            reply: this.state.reply, replyAuthor: this.props.author, authorProfile: this.props.userProfile,
            dateOfReply: new Date().toISOString()})
        }).then(res=>res.json()).then(res=>{
            this.setState({
                isLoading: false
            })
            this.props.addReply(this.state.selectedCommentId,res);
        }).catch(err=>console.log(err));
    }

    toggleDrawer=()=>{
        this.setState({
            selectedComment: null,
            replyDrawer: false
        })
    }

    deleteComment=()=>{
        this.props.deleteComment(this.state.commentId);
        this.toggleDeleteModal('');
    }
    render(){
        const {classes} =this.props;
        return(
            <>
            <Modal show={this.state.deleteComment} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{animation: 'fadeIn 1s fadeOut 1s'}}
            onHide={this.toggleDeleteModal}>
                <Modal.Body>
                    <h6>Really delete this comment?</h6> 
                </Modal.Body>
                <Modal.Footer>
                    <ModalButton class="secondary" style={{borderRadius: '20px'}} onClick={()=>this.toggleDeleteModal('')}>Cancel</ModalButton>
                    <ModalButton class="primary" style={{borderRadius: '20px'}} onClick={this.deleteComment}>Ok</ModalButton>
                </Modal.Footer>
            </Modal>
            <TransitionGroup className="comments" style={{overflow: 'hidden'}}>
            {this.props.comments.map(comment=>(
                <CSSTransition
                key={comment._id}
                timeout={500}
                classNames="item"
              >
                <OneComment comment={comment} toggleDeleteModal={this.toggleDeleteModal} uid={this.props.uid} 
                setSelectedComment={this.setSelectedComment} />
                </CSSTransition>
            ))}
            </TransitionGroup>
            <Drawer
            anchor={'bottom'}
            open={this.state.replyDrawer}
            classes={{paper: classes.paper}}
            onClose={this.toggleDrawer}>
                <div style={{display: 'flex', justifyContent: 'flex-end', padding: '5px 15px'}}>
                    <i class="fa fa-times" aria-hidden="true" style={{fontSize: 'x-large', color: 'rgba(0,0,0,0.5)'}} onClick={this.toggleDrawer}></i>
                </div>
                <Divider />
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10" style={{display: 'flex', justifyContent: 'center', padding: '5px 15px'}}>
                <img src={this.props.userProfile} alt="" style={{width: '45px', height: '45px', borderRadius: '50%'}} />
            <TextField
            style={{width: '45%', margin: '0 10px', backgroundColor: '#fff'}}
            id="filled-basic"
            variant="filled"
            label="Reply"
            rowsMax={2}
            multiline
            placeholder="Write here ..."
            value={this.state.reply}
            onChange={(ev)=>this.setState({reply: ev.target.value})}
        />
        {!this.state.isLoading?(<Button variant="contained" color="primary" 
        style={{maxHeight: '45px', fontWeight: '700', borderRadius: '30px'}} onClick={this.submitReply}>
        Comment
      </Button>):<CircularProgress />}
      </div>
      <div className="col-md-1"></div>
      </div>
                <hr />
                {
                    this.state.selectedCommentId&&this.props.comments.filter(comment=>comment._id===this.state.selectedCommentId)[0].replies.map(reply=>{
                        return(
                            <>
                            <div style={{display: 'flex', padding: '5px 15px'}}>
                    <img src={reply.authorProfile} alt="" style={{width: '45px', height: '45px', borderRadius: '50%'}} />
                    <div style={{display: 'flex', flexDirection: 'column', 
                    textAlign: 'left', width: '-webkit-fill-available',marginLeft: '5px'}}>
                        <span style={{color: 'rgba(0,0,0,0.6)', fontWeight: '700'}}>{reply.replyAuthor}</span>
                        <p style={{marginLeft: '0px',fontStyle: 'Source Sans Pro, sans-serif'}}>{reply.reply}</p>
                        {this.props.author===reply.replyAuthor?<span style={{color: 'red', fontWeight: 'bold'}} onClick={()=>this.deleteReply(reply._id)}>Delete</span>:<span></span>}
                    </div>
                    </div>
                    <hr />
                    </>
                        );
                    })
                }
            </Drawer>
            </>
        );
    }
}

export default withStyles(useStyles)(Comments);
