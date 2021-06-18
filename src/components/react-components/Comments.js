import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OneComment from './OneComment';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import './Comments.css';
class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            deleteComment: false,
            commentId: ''
        }
    }

    toggleDeleteModal=(props)=>{
        this.setState({
            deleteComment: !this.state.deleteComment,
            commentId: props
        })
    }
    deleteComment=()=>{
        this.props.deleteComment(this.state.commentId);
        this.toggleDeleteModal('');
    }
    render(){
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
                    <Button class="secondary" style={{borderRadius: '20px'}} onClick={()=>this.toggleDeleteModal('')}>Cancel</Button>
                    <Button class="primary" style={{borderRadius: '20px'}} onClick={this.deleteComment}>Ok</Button>
                </Modal.Footer>
            </Modal>
            <TransitionGroup className="comments" style={{overflow: 'hidden'}}>
            {this.props.comments.map(comment=>(
                <CSSTransition
                key={comment._id}
                timeout={500}
                classNames="item"
              >
                <OneComment comment={comment} toggleDeleteModal={this.toggleDeleteModal} uid={this.props.uid} />
                </CSSTransition>
            ))}
            </TransitionGroup>
            </>
        );
    }
}

export default Comments;