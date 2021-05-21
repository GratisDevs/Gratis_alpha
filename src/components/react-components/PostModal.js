import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import style from './ModalStyle';
import ReactPlayer from 'react-player';

class PostModal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            post: '',
            error: '',
            shareImage: '',
            shareVideo: '',
            assetArea: ''
            
        };
    }
    checkValidation=(event)=>{
        if(event.target.value.length<50){
            this.setState({
                error: 'Post should be of minimum 50 characters!'
            })
        }
        else{
            this.setState({
                error: ''
            })
        }
    }

    handleChange=(e)=>{
        const image=e.target.files[0];

        if(image===''||image===undefined){
            alert("Not an image!");
            return;
        }
        this.setState({
            shareImage: image
        });
    }

    handleVideoChange=(e)=>{
        this.setState({
            shareVideo: e.target.value
        })
    }

    switchAssetArea=(area)=>{
        this.setState({
            shareImage: '',
            shareVideo: '',
            assetArea: area
        })
    }
    
    render(){
        
        return(
            <Modal show={this.props.isModalOpen} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
            style={{animation: 'fadeIn 1s fadeOut 1s'}}>
                <Modal.Header closeButton={true} onHide={this.props.toggleModal}>
                    <h4 style={{width: '1000%',textAlign: 'center',color: 'rgba(0,0,0,0.5)'}}>Write Something...</h4>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-2 col-md-2"><img style={{borderRadius: '50%',width: '45px'}} src={this.props.photoURL} alt="" /></div>
                        <div class="col-10 col-md-10"><h5 style={{position: 'absolute',top: '30%',fontWeight: '700'}}>{this.props.userName}</h5></div>
                    </div>
                    <div class="row" style={{marginTop: '8px'}}>
                        <div class="col-md-12">
                            <textarea
                            value={this.state.post}
                            onChange={(event)=>{this.setState({post: event.target.value})}}
                            onBlur={(event)=>{this.checkValidation(event)}}
                            style={{width: '100%', padding: '12px 12px', minHeight:'160px', resize: 'none'}}
                            placeholder="What do you want to talk about?" />
                        </div>
                    </div>
                    <div class="row" style={{marginTop: '8px'}}>
                        <div class="col-md-12">
                            <span style={{color: 'red', fontSize: '13px'}}>{this.state.error}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            {this.state.assetArea==='image'?
                    (<style.UploadImage>
                                <input type="file" 
                                accept="image/*" 
                                name="image"
                                id="file"
                                style={{display: 'none'}}
                                onChange={(event)=>{this.handleChange(event)}} 
                                />
                                <p><label htmlFor="file">
                                    Select an image to share</label></p>
                                {this.state.shareImage&&<img src={URL.createObjectURL(this.state.shareImage)} alt="" />} 
                                </style.UploadImage>)
                                :
                                (this.state.assetArea==='media'&&(<>
                                    <input 
                                    type="text"
                                    placeholder="Please input a video link"
                                    value={this.state.shareVideo}
                                    style={{width: '100%'}}
                                    onChange={(event)=>{this.handleVideoChange(event)}}
                                    />
                                    {this.state.shareVideo&&<ReactPlayer width={'100%'} url={this.state.shareVideo} />}
                                </>))
                            }
                            </div>
                        </div>
                    <div class="row">
                    <style.ShareCreation>
                        <style.AttachAssets>
                            <style.AssetButton onClick={()=>{this.setState({assetArea: 'image'})}}>
                                <img src="/images/photo.svg" alt="" />
                            </style.AssetButton>
                            <style.AssetButton onClick={()=>{this.setState({assetArea: 'media'})}}>
                                <img src="/images/video-camera.svg" alt="" />
                            </style.AssetButton>
                        </style.AttachAssets>
                        <style.ShareComment>
                            <style.AssetButton>
                                <img src="/images/comment.svg" alt="" />
                                Anyone
                            </style.AssetButton>
                        </style.ShareComment>
                    </style.ShareCreation>
                    </div>
                </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleModal} style={{borderRadius: '20px'}}>
            Cancel
          </Button>
          {this.state.post.length>=50&&<Button variant="primary" onClick={this.props.toggleModal} style={{borderRadius: '20px'}}>
            Submit
          </Button>}
        </Modal.Footer>
            </Modal>
        );
    }
}

export default PostModal;
