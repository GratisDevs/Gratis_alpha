import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import style from './ModalStyle';
import ReactPlayer from 'react-player';
import {submitPost} from '../../actions/PostHandle';
import { connect } from 'react-redux';

class PostModal extends React.Component{

    constructor(props){
        super(props);
        this.state={
            title: '',
            post: '',
            errorTitle: '',
            shareImage: '',
            shareVideo: '',
            assetArea: '',
            subGratis: 'Cricket',
            isLoading: false
            
        };
    }

    handleImageChange=(e)=>{
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
        const video=e.target.files[0];

        if(video===''||video===undefined){
            alert("Not a video!");
            return;
        }

        console.log(video);
        this.setState({
            shareVideo: video
        })
    }

    changeLoading=()=>{
        this.setState({isLoading: false})
    }

    submitpost=(e)=>{
        if(this.state.title===''){
            this.setState({errorTitle: 'Title cannot be empty'})
            return;
        }

        this.setState({isLoading: true},()=>{
            this.props.dispatch(submitPost(this.props.userName,this.props.email,this.state.title,
                this.state.post,this.state.subGratis,this.state.shareImage,this.state.shareVideo,this.changeLoading))
        })

        
    }

    switchAssetArea=(area)=>{
        this.setState({
            shareImage: '',
            shareVideo: '',
            assetArea: area
        })
    }

    handleSelectChange=(event)=>{
        this.setState({subGratis: event.target.value})
        console.log(event.target.value);
    }
    
    render(){
        const options = [
            {"value": "Cricket","name":"Cricket"},
            {"value": "Fashion","name":"Fashion"},
            {"value": "Entertainment","name":"Entertainment"},
            {"value": "Technology","name":"Technology"},
            {"value": "Cuisine","name":"Cuisine"}
          ];
          const defaultOption = options[0];
        return(
            <Modal show={this.props.isModalOpen} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
            style={{animation: 'fadeIn 1s fadeOut 1s'}}>
                <Modal.Header closeButton={true} onHide={this.props.toggleModal}>
                    <h5 style={{width: '100%',color: 'rgba(0,0,0,0.5)'}}>Write Something...</h5>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-2 col-md-2"><img style={{borderRadius: '50%',width: '45px'}} src={this.props.photoURL} alt="" /></div>
                        <div class="col-10 col-md-10"><h5 style={{position: 'absolute',top: '30%',fontWeight: '700'}}>{this.props.userName}</h5></div>
                    </div>
                    {this.state.isLoading&&<div class="row" style={{marginTop: '5px'}}>
                        <div class="col-md-12" style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                        </div>
                    </div>}
                    <div class="row" style={{marginTop: '8px'}}>
                        <div class="col-md-12">
                        <input 
                        type="text"
                        value={this.state.title}
                        placeholder={'Write an appropriate title'}
                        onChange={(e)=>{this.setState({title: e.target.value});if(this.state.title!=='') this.setState({errorTitle: ''})}}
                        style={{width: '100%', padding: '12px 12px'}} />
                        </div>
                    </div>
                    <div class="row" style={{marginTop: '5px'}}>
                        <div class="col-md-12">
                            <span style={{color: 'red', fontSize: '13px'}}>{this.state.errorTitle}</span>
                        </div>
                    </div>
                    <div class="row" style={{marginTop: '8px'}}>
                        <div class="col-md-12">
                            <textarea
                            value={this.state.post}
                            onChange={(event)=>{this.setState({post: event.target.value})}}
                            style={{width: '100%', padding: '12px 12px', minHeight:'160px', resize: 'none'}}
                            placeholder="What do you want to talk about?" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                        <select onChange={this.handleSelectChange} 
                        style={{width: '100%', backgroundColor: 'transparent', height: '100%',padding: '10px'}}
                        value={this.state.subGratis}>
   {
     options.map((elem)=><option value={elem.value}>{elem.name}</option>)
 }
</select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            {this.state.assetArea==='image'?
                    (<style.UploadImage>
                                <input type="file" 
                                accept="image/*" 
                                name="myfile"
                                id="file"
                                style={{display: 'none'}}
                                onChange={(event)=>{this.handleImageChange(event)}} 
                                />
                                <p><label htmlFor="file">
                                    Select an image to share</label></p>
                                {this.state.shareImage&&<img src={URL.createObjectURL(this.state.shareImage)} alt="" />} 
                                </style.UploadImage>)
                                :
                                (this.state.assetArea==='media'&&(<>
                                    <input type="file" 
                                    name="myfile"
                                    id="file"
                                accept="video/*" 
                                style={{display: 'none'}}
                                onChange={(event)=>{this.handleVideoChange(event)}} 
                                />
                                <p style={{textAlign: 'center',marginBottom: '0'}}><label htmlFor="file">
                                    Select a video to share</label></p>
                                    {this.state.shareVideo&&<ReactPlayer width={'100%'} url={URL.createObjectURL(this.state.shareVideo)} controls={true} />}
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
                    </style.ShareCreation>
                    </div>
                    </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={this.props.toggleModal} style={{borderRadius: '20px'}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.submitpost} style={{borderRadius: '20px'}}>
            Submit
          </Button>
        </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps=(state)=>({
    email: state.userState.email
})

export default connect(mapStateToProps)(PostModal);
