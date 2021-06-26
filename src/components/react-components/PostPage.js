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
import socketClient from 'socket.io-client';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router';

class PostPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            post: {},
            deleteModal: false, 
            shareModal: false,
            socket: socketClient('https://snaptok.herokuapp.com'),
            snackbar: false
        }
    }

    componentDidMount(){
        fetch('https://snaptok.herokuapp.com/fetchPost/'+this.props.match.params.id,{
            method: 'GET'
        }).then(res=>res.json()).then(res=>{
            if(res.message==='Failure')
                this.setState({snackbar: true})
            else
                this.setState({post: res})}).catch(err=>console.log(err));
        this.state.socket.on('connection',()=>{
            console.log("connected to the server");
        })
    }

    postDeleted=()=>{
        this.props.dispatch(deletePostFromStore(this.props.match.params.id));
        this.setState({
            snackbar: true
        },()=>{
            setTimeout(()=>this.props.history.push("/"), 3000);
        })
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
        }).then(res=>this.toggleDeleteModal()).catch(err=>{console.log(err);})
    }
    
      toggleDeleteModal=()=>{
        this.setState({
                deleteModal: !this.state.deleteModal
            });
      }

    render(){
        const dateTime='';
        if(this.state.post!==null){
            dateTime=new Date(this.state.post.dateTime);
        }
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
                            {Object.keys(this.state.post).length === 0?(<div class="row" style={{marginTop: '100px'}}>
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
                                <span style={{color: 'rgba(0,0,0,0.8)'}}>
                                    {dateTime.getDate()+"-"+dateTime.getMonth()+"-"+dateTime.getYear()} at {dateTime.getHours()+":"+dateTime.getMinutes()}</span>
                                </div>
                                <div class="title-div">
                                    <h5 class="title-style title-big-screen">{this.state.post.title}</h5>
                                </div>
                                <div style={{maxWidth: 'fit-content'}}>
                                    {this.props.uid===this.state.post.uid?<i class="fa fa-trash" style={{fontSize: 'larger'}} onClick={this.toggleDeleteModal}></i>:<></>}
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
                               postId={this.state.post._id} userName={this.props.userName} 
                               postDeleted={this.postDeleted}
                               socket={this.state.socket} />
                           </style.Article></>)}
                           </div>
                           <div className="col-md-2"></div>
                       </div>
                       </div>
                       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.snackbar}
        autoHideDuration={3000}
        onClose={()=>this.setState({snackbar: false})}
        message="This post has been deleted"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>this.setState({snackbar: false})}>
            <i class="fa fa-times" aria-hidden="true" style={{color: 'white', fontSize: 'larger'}}></i>
            </IconButton>
          </React.Fragment>
        }
      />
                   </>
                       
                   ):<Loading />}
                </>
        );
    }
}

const mapStateToProps=(state)=>({
    userProfile: state.userState.photoURL
})

export default withRouter(connect(mapStateToProps)(PostPage));