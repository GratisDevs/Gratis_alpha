import React from 'react';
import Loading from './Loading';
import UserProfile from './UserProfile';
import style from './MainStyle';
import DeleteModal from './DeleteModal';
import { connect } from 'react-redux';
import {deletePostFromStore} from '../../actions/PostHandle';
import './PostPage.css';
import ReactMarkdown from 'react-markdown';
import {renderers} from './CodeBlock';
import ReactPlayer from 'react-player';
import SocialCount from './SocialCount';
import HeartIcon from './HeartIcon';
import PostActivity from './PostActivity';
import ShareModal from './ShareModal';
import NavbarMainComponent from '../navbar_components/navbarmaincomponent';

class PostPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            post: {},
            deleteModal: false, 
            shareModal: false
        }
    }

    componentDidMount(){
        fetch('https://snaptok.herokuapp.com/fetchPost/'+this.props.match.params.id,{
            method: 'GET'
        }).then(res=>res.json()).then(res=>this.setState({post: res})).catch(err=>console.log(err));
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
            body: JSON.stringify({id: this.props.match.params.id}),
        }).then(res=>{alert("Post deleted successfully!!");this.props.dispatch(deletePostFromStore(this.props.match.params.id));
        this.toggleDeleteModal();
        }).
        catch(err=>{console.log(err);})
    }
    
      toggleDeleteModal=()=>{
        this.setState({
                deleteModal: !this.state.deleteModal
            });
      }

    render(){
        return(
                <>
                   {this.props.uid?(
                       <>
                       <NavbarMainComponent isLoggedIn={true} logout={this.props.logout} />
                       <DeleteModal toggleDeleteModal={this.toggleDeleteModal} 
                       deleteModal={this.state.deleteModal} deletePost={this.deletePost} />
                       <div className="container-fluid"><div className="row" style={{marginTop: '100px'}}>
                           <div className="col-md-2"></div>
                           <div className="col-md-8 col-12">
                            {Object.keys(this.state.post).length == 0?(<div class="row" style={{marginTop: '100px'}}>
            <div class="col-md-12" style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            </div>
        </div>):(<><ShareModal shareModal={this.state.shareModal} toggleShareModal={this.toggleShareModal} postId={this.state.post._id} />
        <style.Article>
                           <style.SharedActor>
                               <div style={{display: 'flex', flexDirection: 'column', width: '-webkit-fill-available'}}>
                               <a>
                               <UserProfile userProfile={this.state.post.userProfile} />
                                <div style={{display: 'flex',flexDirection: 'column',maxWidth: 'fit-content', justifyContent: 'space-between'}}>
                                <span style={{textAlign: 'left', display: 'block', fontSize: 'medium'}} className="title-style">{this.state.post.author}</span>
                                <span style={{fontSize: '11px', color: '#595959', fontWeight: '700'}}>{this.state.post.dateOfPost}</span>
                                </div>
                                <div class="title-div">
                                    <h5 class="title-style title-big-screen">{this.state.post.title}</h5>
                                </div>
                                <div style={{maxWidth: 'fit-content'}}>
                                    {this.props.uid==this.state.post.uid?<i class="fa fa-trash" style={{fontSize: 'larger'}} onClick={this.toggleDeleteModal}></i>:<></>}
                                </div>
                               </a>
                               <hr />
                               <div class="title-small-screen">
                                    <h5 class="title-style">{this.state.post.title}</h5>
                                </div>
                                
                               </div>
                           </style.SharedActor>
                                <div>
                                    <ReactMarkdown children={this.state.post.description} renderers={renderers} />
                                </div>
                                <div>
                                {this.state.post.file!==''?(this.state.post.fileType==='image'?(<style.SharedImage>
          <img src={this.state.post.file} alt="" />
        </style.SharedImage>):(
          <div style={{marginTop: '8px', height: '100%'}}>
            <ReactPlayer url={this.state.post.file} width={'100%'} height={'100%'} controls={true} />
          </div>
        )):<b></b>}
                                </div>
                                <style.SocialCount>
                                <SocialCount postId={this.state.post._id} likes={this.state.post.likes} uid={this.props.uid} />
                                </style.SocialCount>
                                <style.SocialActions>
                                    <HeartIcon postId={this.state.post._id} uid={this.props.uid} />
                                    <i class="fa fa-paper-plane-o" aria-hidden="true" style={{fontSize: 'x-large'}} onClick={this.toggleShareModal}></i>
                                </style.SocialActions>
                           </style.Article>
                           <style.Article>
                               <PostActivity comments={this.state.post.comments} 
                               uid={this.props.uid} userProfile={this.props.userProfile} 
                               postId={this.state.post._id} userName={this.props.userName} />
                           </style.Article></>)}
                           </div>
                           <div className="col-md-2"></div>
                       </div>
                       </div>
                   </>
                       
                   ):<Loading />}
                </>
        );
    }
}

const mapStateToProps=(state)=>({
    userProfile: state.userState.photoURL
})

export default connect(mapStateToProps)(PostPage);