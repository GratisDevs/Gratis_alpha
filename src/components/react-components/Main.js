import React from 'react';
import { render } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import style from './MainStyle';
import PostModal from './PostModal';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
	}

  componentDidMount(){
    this.props.fetchPosts();
  }

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};
	
  render(){

    const feed=this.props.posts.map((post)=>{
      return(
        <style.Article>
        <style.SharedActor>
          <a>
            <img src="/images/user.svg" alt="" style={{marginTop: '8px'}} />
            <div style={{display: 'flex',flexDirection: 'column'}}>
            <h6 style={{marginTop: '14px', textAlign: 'left'}}>{post.author}</h6>
            <span style={{fontSize: '11px',color: '#595959',fontWeight: '700'}}>{post.dateOfPost}</span>
          </div>
          </a>
        </style.SharedActor>
        <div className="row" style={{marginLeft: '5px'}}>
          <div className="col-md-12">
            <h5 style={{textAlign: 'left'}}>{post.title}</h5>
          </div>
        </div>
        {post.file!==''?(post.fileType==='image'?(<style.SharedImage>
          <a>
            <img src={post.file} alt="" />
          </a>
        </style.SharedImage>):(
          <div style={{marginTop: '8px', height: '100%'}}>
            <ReactPlayer url={post.file} width={'100%'} height={'100%'} controls={true} />
          </div>
        )):<b></b>}
        <style.SocialCount>
          <li>
            <button>
              <img src="/images/like.svg" alt="" />
              <span>{post.likes}</span>
            </button>
            <button>
              <img src="/images/clap.svg" alt="" />
              <span>{post.claps}</span>
            </button>
          </li>
          <li>
            
            <a>{post.comments.length}</a>
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
          <img src="/images/send.svg" alt="" />
          <span>Send</span>
        </button>
        </style.SocialActions>
      </style.Article>
      )
    })

    return (
  <div className="col-md-7">
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
    {this.props.isLoading?<div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
    </div>:feed}
  </div>);}
};

const mapStateToProps=(state)=>{
  return{
    photoURL: state.userState.photoURL,
    isLoading: state.postState.isLoading,
    posts: state.postState.posts
  }
}

export default connect(mapStateToProps)(Main);