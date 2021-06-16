import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
            
            {this.props.comments.map(comment=>(
                <>
                <div style={{display: 'flex', padding: '0 5px'}}>
                    <img src={comment.userProfile} style={{width: '45px', height: '45px', borderRadius: '50%'}} />
                    <div style={{display: 'flex', flexDirection: 'column', 
                    textAlign: 'left', width: '-webkit-fill-available',marginLeft: '5px'}}>
                        <span style={{color: 'rgba(0,0,0,0.6)', fontWeight: '700'}}>{comment.commentAuthor}</span>
                        <p style={{marginLeft: '0px',fontStyle: 'Source Sans Pro, sans-serif'}}>{comment.comment}</p>
                        {this.props.uid==comment.uid?<span style={{color: 'red', fontWeight: '700'}} onClick={()=>this.toggleDeleteModal(comment._id)}>Delete</span>:<span></span>}
                    </div>
                </div>
                <hr />
                </>
            ))}
            </>
        );
    }
}

export default Comments;