import React from 'react';
import style from './MainStyle';
import ReactPlayer from 'react-player';
import SocialCount from './SocialCount';
import ShareModal from './ShareModal';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import {deletePostFromStore} from '../../actions/PostHandle';
import HeartIcon from './HeartIcon';
import './img.css';
import { connect } from 'react-redux';

class Feed extends React.Component{
    constructor(props){
        super(props);
        this.state={
            shareModal: false,
            deleteModal: false,
            postToDelete: ''
        }
    }

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
        }).catch(err=>{console.log(err);})
    }
    
      toggleDeleteModal=(id)=>{
        this.setState({
                deleteModal: !this.state.deleteModal,
                postToDelete: this.state.postToDelete===''?id:''
            });
      }

      render(){
            return(
                this.props.posts.map((post)=>{
                var date=new Date(post.dateTime);
                return(
                    <> 
                <ShareModal shareModal={this.state.shareModal} toggleShareModal={this.toggleShareModal} postId={post._id} />
                <DeleteModal toggleDeleteModal={this.toggleDeleteModal} 
                deleteModal={this.state.deleteModal} deletePost={this.deletePost} />
                <style.Article>
                <style.SharedActor>
                  <a href="#">
                    <UserProfile userProfile={post.userProfile} />
                    <div style={{display: 'flex',flexDirection: 'column'}}>
                    <div><h6 style={{marginTop: '14px', textAlign: 'left'}}className="title-style">{post.author}</h6>
                    {post.uid===this.props.uid?<i style={{position: 'absolute',right: '10px', top: '27px',color: 'rgba(0,0,0,0.7)'}} 
                    class="fa fa-trash" aria-hidden="true" onClick={()=>this.toggleDeleteModal(post._id)}></i>:<div></div>}</div>
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
                <div style={{display: 'flex', alignItems: 'flex-start', marginLeft: '5px', paddingLeft: '15px'}}>
                <span style={{marginRight: '5px', color: 'rgba(0,0,0,0.8)'}}>{date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()} at </span>
                <span style={{color: 'rgba(0,0,0,0.8)'}}>{date.getHours()+":"+date.getMinutes()}</span>
                </div>
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
                );
            })
            );
                
      }
}

const mapStateToProps=(state)=>({
    
})

export default connect(mapStateToProps)(Feed);