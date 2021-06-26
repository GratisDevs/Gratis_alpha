import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
} from 'react-share';

class ShareModal extends React.Component{
    render(){
        return(
            <Modal show={this.props.shareModal} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{animation: 'fadeIn 1s fadeOut 1s'}}
            onHide={this.props.toggleShareModal}>
                <Modal.Header closeButton={true}>
                    <h5 style={{width: '100%',color: 'rgba(0,0,0,0.5)'}}>Share On ...</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12" style={{display: 'flex',justifyContent: 'center'}}>
                            <FacebookShareButton
                            url={'gratis-3ce5a.web.app/post/'+this.props.postId}
                            quote={'See this post...'}
                            hashtag={'#Gratis'}
                            >
                                <FacebookIcon size={'2.5rem'} />
                            </FacebookShareButton>
                            <TwitterShareButton
                            url={'gratis-3ce5a.web.app/post/'+this.props.postId}
                            title={'See this post ...'}>
                                <TwitterIcon size={'2.5rem'}/>
                            </TwitterShareButton>
                            <WhatsappShareButton
                            url={'gratis-3ce5a.web.app/post/'+this.props.postId}
                            title={'See this Post'}>
                                <WhatsappIcon size={'2.5rem'} />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ShareModal;