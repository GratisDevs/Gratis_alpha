import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import style from './MainStyle';
import PostModal from './PostModal';

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen: false
  }
  }

  toggleModal=()=>{
    this.setState({
        isModalOpen: !this.state.isModalOpen
    })
}

  render(){
    console.log("sid");
    console.log(this.props.photoURL);
    return (
  <div className="col-md-6">
    <PostModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal} userName={this.props.userName} photoURL={this.props.photoURL} />
    <style.ShareBox>
      <h4 style={{textAlign: 'center'}}>Share</h4>
    <div>
      <img src={this.props.photoURL} alt="" />
      <button onClick={this.toggleModal}>Start a post</button>
    </div>
    <div>
      <button>
        <img src="/images/gallery.png" alt="" />
        <span>Photo</span>
      </button>
      <button>
        <img src="/images/video-camera.png" alt="" />
        <span>Video</span>
      </button>
      <button>
        <img src="/images/edit.png" alt="" />
        <span>Article</span>
      </button>
    </div>
    </style.ShareBox>
    <div>
      <style.Article>
        <style.SharedActor>
          <a>
            <img src="/images/user.svg" alt="" />
            <div>
              <span>Title</span>
              <span>Info</span>
              <span>Date</span>
            </div>
          </a>
          <button>
            <img src="/images/more.svg" alt=""/>
          </button>
        </style.SharedActor>
        <style.Description>Description</style.Description>
        <style.SharedImage>
          <a>
            <img src="/images/shared_image.jpg" alt="" />
          </a>
        </style.SharedImage>
        <style.SocialCount>
          <li>
            <button>
              <img src="/images/like.svg" alt="" />
              <span>23</span>
            </button>
            <button>
              <img src="/images/clap.svg" alt="" />
              <span>15</span>
            </button>
          </li>
          <li>
            <a>2 comments</a>
          </li>
        </style.SocialCount>
        <style.SocialActions>
        <button>
          <img src="/images/like.svg" alt="" />
          <span>Like</span>
        </button>
        <button>
          <img src="/images/comment.svg" alt="" />
          <span>Comments</span>
        </button>
        <button>
          <img src="/images/share.svg" alt="" />
          <span>Share</span>
        </button>
        <button>
          <img src="/images/send.svg" alt="" />
          <span>Send</span>
        </button>
        </style.SocialActions>
      </style.Article>
    </div>
  </div>);}
};

const mapStateToProps=(state)=>{
  return{
    photoURL: state.userState.photoURL
  }
}

export default connect(mapStateToProps)(Main);