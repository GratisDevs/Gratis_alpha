import React from 'react';
import Loading from './Loading';
import UserProfile from './UserProfile';
import style from './MainStyle';
import DeleteModal from './DeleteModal';
import { connect } from 'react-redux';
import {deletePostFromStore} from '../../actions/PostHandle';
import {db} from '../data_components/firebase';

class PostPage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            post: {},
            UserProfileImage: '/images/user.svg',
            deleteModal: false
        }
    }

    componentDidMount(){
        fetch('https://snaptok.herokuapp.com/fetchPost/'+this.props.match.params.id,{
            method: 'GET'
        }).then(res=>res.json()).then(res=>{
            db.collection("users").where("uid","==",res.uid).get().then(query=>{
                const user=query.docs[0];
                const URL=user.data().photoURL;
                if(URL!=="")
                    this.setState({
                        post: res,
                        UserProfileImage: URL
                    });
            })
        }).catch(err=>console.log(err));
    }
    deletePost=()=>{
    
        fetch('https://snaptok.herokuapp.com/deletePost',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: this.props.match.params.id}),
        }).then(res=>{alert("Post deleted successfully!");this.props.dispatch(deletePostFromStore(this.props.match.params.id));
        this.toggleDeleteModal();
        }).
        catch(err=>{console.log(err);})
    }
    
      toggleDeleteModal=()=>{
        this.setState({
                deleteModal: !this.state.deleteModal,
            });
      }

      componentWillUnmount(){
          console.log("PostPage unmounted");
      }

    render(){
        console.log("rendered"+this.state.post.uid);
        return(
                <>
                   {this.props.uid?(
                       <>
                       <DeleteModal toggleDeleteModal={this.toggleDeleteModal} 
                       deleteModal={this.state.deleteModal} deletePost={this.deletePost} />
                       <div className="container-fluid"><div className="row" style={{marginTop: '100px'}}>
                           <div className="col-md-2"></div>
                           <div className="col-md-8 col-12">
                           <style.SharedActor>
                               <a>
                                   <img src={this.state.UserProfileImage} style={{marginTop: '8px'}} />
                                   <div style={{display: 'flex',flexDirection: 'column'}}>
                                   <div><h6 style={{marginTop: '14px', textAlign: 'left'}}className="title-style">{this.state.post.author}</h6>
                                   {this.state.post.uid===this.props.uid?<i style={{position: 'absolute',right: '20px', top: '27px',color: 'rgba(0,0,0,0.7)'}} 
                                   class="fa fa-trash" aria-hidden="true" onClick={()=>this.toggleDeleteModal()}></i>:<div></div>}</div>
                                   <span style={{fontSize: '11px',color: '#595959',fontWeight: '700'}}>{this.state.post.dateOfPost}</span>
                               </div>
                               </a>
                           </style.SharedActor>
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

const mapStateToProps=(state)=>({})

export default connect(mapStateToProps)(PostPage);