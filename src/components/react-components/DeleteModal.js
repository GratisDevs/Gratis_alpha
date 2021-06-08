import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react';


class DeleteModal extends React.Component{

    

    render(){
        return(
            <Modal show={this.props.deleteModal} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{animation: 'fadeIn 1s fadeOut 1s'}}
            onHide={this.props.toggleDeleteModal}>
                <Modal.Body>
                    <div className="row"><div className="col-md-12"><p>Do you really want to delete this post?</p></div></div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.toggleDeleteModal} style={{borderRadius: '20px'}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.deletePost} style={{borderRadius: '20px'}}>
            Ok
          </Button> 
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DeleteModal;