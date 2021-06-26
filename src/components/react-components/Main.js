import React from 'react';



import { connect } from 'react-redux';
import style from './MainStyle';
import PostModal from './PostModal';

import BallLoader from './BallLoader';


import Feed from './Feed';
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
  }
	}

  componentDidMount(){
    if(this.props.posts.length===0)
      this.props.fetchPosts("");
  }

  handleChange=(event)=>{
    var name=event.target.name;
    this.setState({
        [name]: event.target.checked,
        arr: event.target.checked?[...this.state.arr,name]:this.state.arr.filter(elem=>elem!==name)
    })
}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	};


  render(){

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
      <button onClick={this.toggleModal}>
        <img src="/images/gallery.png" alt="" />
        <span>Photo</span>
      </button>
      <button onClick={this.toggleModal}>
        <img src="/images/video-camera.png" alt="" />
        <span>Video</span>
      </button>
      <button onClick={this.toggleModal}>
        <img src="/images/edit.png" alt="" />
        <span>Article</span>
      </button>
    </div>
    </style.ShareBox>

    
    {this.props.isLoading?<div><BallLoader></BallLoader></div>:<Feed posts={this.props.posts} uid={this.props.uid} />}
    
  </div>);}
};

const mapStateToProps=(state)=>{
  return{
    photoURL: state.userState.photoURL,
    isLoading: state.postState.isLoading,
    posts: state.postState.posts,
    uid: state.userState.uid
  }
}

export default connect(mapStateToProps)(Main);