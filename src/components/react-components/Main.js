import React from 'react';
import { render } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import style from './MainStyle';
import PostModal from './PostModal';
import SocialCount from './SocialCount';
import Category from './Category';
import ShareModal from './ShareModal';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import BallLoader from './BallLoader';
import {deletePostFromStore} from '../../actions/PostHandle';
import HeartIcon from './HeartIcon';
import './Main.css';
import './img.css';



class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state={
      isModalOpen: false,
      Cricket: false,
      Entertainment: false,
      Fashion: false,
      Technology: false,
      Cuisine: false,
      arr: [],
      shareModal: false,
      deleteModal: false,
      postToDelete: ''
  }
	}

  componentDidMount(){
    if(this.props.posts.length==0)
      this.props.fetchPosts();
  }

  handleChange=(event)=>{
    var name=event.target.name;
    this.setState({
        [name]: event.target.checked,
        arr: event.target.checked?[...this.state.arr,name]:this.state.arr.filter(elem=>elem!=name)
    })
}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};

  toggleShareModal=()=>{
    this.setState({
			shareModal: !this.state.shareModal
		});
  }

  deletePost=()=>{
    
    fetch('https://snaptok.herokuapp.com/deletePost',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: this.state.postToDelete}),
    }).then(res=>{alert("Post deleted successfully!");this.props.dispatch(deletePostFromStore(this.state.postToDelete));
    this.toggleDeleteModal();
    }).
    catch(err=>{console.log(err);})
}

  toggleDeleteModal=(id)=>{
    this.setState({
			deleteModal: !this.state.deleteModal,
      postToDelete: this.state.postToDelete===''?id:''
		});
  }
	
  render(){

    const feed=this.props.posts.filter((elem)=>{
      if(this.state.arr.length==0) return true;
      else return this.state.arr.includes(elem.subGratis)
    }).map((post)=>{
      return(
        <> 
        <ShareModal shareModal={this.state.shareModal} toggleShareModal={this.toggleShareModal} postId={post._id} />
        <DeleteModal toggleDeleteModal={this.toggleDeleteModal} 
        deleteModal={this.state.deleteModal} deletePost={this.deletePost} />
        <style.Article>
        <style.SharedActor>
          <a>
            <UserProfile userProfile={post.userProfile} />
            <div style={{display: 'flex',flexDirection: 'column'}}>
            <div><h6 style={{marginTop: '14px', textAlign: 'left'}}className="title-style">{post.author}</h6>
            {post.uid===this.props.uid?<i style={{position: 'absolute',right: '10px', top: '27px',color: 'rgba(0,0,0,0.7)'}} 
            class="fa fa-trash" aria-hidden="true" onClick={()=>this.toggleDeleteModal(post._id)}></i>:<div></div>}</div>
            <span style={{fontSize: '11px',color: '#595959',fontWeight: '700'}}>{post.dateOfPost}</span>
          </div>
          </a>
        </style.SharedActor>
        <Link to={`/post/${post._id}`} style={{textDecoration: 'none', color: 'black'}}>
        <div className="row" style={{marginLeft: '5px'}}>
          <div className="col-md-12">
            <h5 style={{textAlign: 'left'}} className="title-style">{post.title}</h5>
          </div>
        </div>
        {post.file!==''?(post.fileType==='image'?(<style.SharedImage>
          <img src={post.file} alt="" />
        </style.SharedImage>):(
          <div style={{marginTop: '8px', height: '100%'}}>
            <ReactPlayer url={post.file} width={'100%'} height={'100%'} controls={true} />
          </div>
        )):<b></b>}</Link>
        <style.SocialCount>
          <SocialCount postId={post._id} likes={post.likes} uid={this.props.uid} />
        </style.SocialCount>
        <style.SocialActions>
        <HeartIcon postId={post._id} uid={this.props.uid} />
        <Link to={`/post/${post._id}`} style={{textDecoration: 'none', color: 'black'}}><i class="fa fa-comments-o" aria-hidden="true" style={{fontSize: 'larger'}}></i></Link>
        <i class="fa fa-paper-plane-o" aria-hidden="true" style={{fontSize: 'larger'}} onClick={this.toggleShareModal}></i>
        </style.SocialActions>
      </style.Article>
      </>
      )
    })

    return (
  <div className="col-md-6">
    
    <PostModal isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal} userName={this.props.userName} 
    photoURL={this.props.photoURL} uid={this.props.uid} />
    <style.ShareBox>
      <h4 style={{textAlign: 'center'}}>Share</h4>
    <div>
      {this.props.photoURL?<img src={this.props.photoURL} alt="" />:<img src="/images/user.svg" alt="" />}
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
    <div className="row">
      <div className="col-md-12">
        <i class="fa fa-filter" aria-hidden="true" style={{fontSize: 'xx-large'}}></i>
        <Category handleChange={this.handleChange} selected={this.state}/>
      </div>
    </div>
    
    {this.props.isLoading?<div><BallLoader></BallLoader></div>:feed}
    
  </div>);}
};
{/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img class="loader" src="/images/DP.jpg" style={{ height: '60px', width: '60px', borderRadius: '50%' }} />
</div> */}

const mapStateToProps=(state)=>{
  return{
    photoURL: state.userState.photoURL,
    isLoading: state.postState.isLoading,
    posts: state.postState.posts,
    uid: state.userState.uid
  }
}

export default connect(mapStateToProps)(Main);