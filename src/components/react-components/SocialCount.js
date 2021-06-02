import { post } from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import firebase from '../data_components/firebase.js';


class SocialCount extends React.Component{
    constructor(props){
        super(props);
        //console.log(props);
        this.state={
            user: props.user,
            likes: props.likes,
            likeUpdated: false,
            dislikes: props.dislikes,
            dislikesUpdated: false,
            postId: props.postId,
            baseUrl: 'http://snaptok.herokuapp.com/',
            db: firebase.firestore()
        }
    }

    componentDidMount(){
        this.state.db.collection("users").where("displayName","==",this.state.user).get().then(query=>{
            const doc=query.docs[0];
            console.log(doc);
            this.setState({
                likeUpdated: doc.data().likes.includes(this.state.postId),
                dislikesUpdated: doc.data().dislikes.includes(this.state.postId)
            })
        })
    }


    sendDislikeRequests=(props)=>{
        fetch(this.state.baseUrl+'dislike',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id":this.state.postId,"action": props})
        }).then(res=>res.json()).catch(err=>err);
    }

    sendLikeRequests=(props)=>{
        fetch(this.state.baseUrl+'like',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id":this.state.postId,"action": props})
        }).then(res=>res.json()).catch(err=>err);
    }

    handleFirestoreLike=(props)=>{
        this.state.db.collection("users").where("displayName","==",this.state.user).get().then(query=>{
			const document=query.docs[0];
            if(props=="add")
                document.ref.update({
                    likes: firebase.firestore.FieldValue.arrayUnion(this.state.postId)
                });
            else
                document.ref.update({
                    likes: firebase.firestore.FieldValue.arrayRemove(this.state.postId)
                }); 
		});
    }

    handleFirestoreDislike=(props)=>{
        this.state.db.collection("users").where("displayName","==",this.state.user).get().then(query=>{
			const document=query.docs[0];
            if(props=="add")
                document.ref.update({
                    dislikes: firebase.firestore.FieldValue.arrayUnion(this.state.postId)
                });
            else
                document.ref.update({
                    dislikes: firebase.firestore.FieldValue.arrayRemove(this.state.postId)
                }); 
		});
    }

    handleLike=()=>{
        if(!this.state.likeUpdated){
            if(this.state.dislikesUpdated){
                this.setState((prevState,props)=>{
                    return{
                        dislikes: prevState.dislikes-1,
                        dislikesUpdated: false
                    }
                })
                this.sendDislikeRequests("decrease");
                this.handleFirestoreDislike("remove")
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    likes: prevState.likes+1,
                    likeUpdated: true
                }
            })
            this.sendLikeRequests("increase");
            this.handleFirestoreLike("add")
        }
        }
        else{
            if(this.state.dislikesUpdated){
                this.setState((prevState,props)=>{
                    return{
                        dislikes: prevState.dislikes-1,
                        dislikesUpdated: false
                    }
                })
                this.sendDislikeRequests("decrease");
                this.handleFirestoreDislike("remove")
            }
            else{this.setState((prevState,props)=>{
                return{
                    likes: prevState.likes-1,
                    likeUpdated: false
                }
            })
            this.sendLikeRequests("decrease");
            this.handleFirestoreLike("remove")
        }
        }
    }

    handledislikes=()=>{
        if(!this.state.dislikesUpdated){
            if(this.state.likeUpdated){
                this.setState((prevState,props)=>{
                    return{
                        likes: prevState.likes-1,
                        likeUpdated: false
                    }
                })
                this.sendLikeRequests("decrease");
                this.handleFirestoreLike("remove")
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    dislikes: prevState.dislikes+1,
                    dislikesUpdated: true
                }
            })
            this.sendDislikeRequests("increase");
            this.handleFirestoreDislike("add")
        }
        }
        else{
            if(this.state.likeUpdated){
                this.setState((prevState,props)=>{
                    return{
                        likes: prevState.likes-1,
                        likeUpdated: false
                    }
                })
                this.sendLikeRequests("decrease");
                this.handleFirestoreLike("remove")
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    dislikes: prevState.dislikes-1,
                    dislikesUpdated: false
                }
            })
            this.sendDislikeRequests("decrease");
            this.handleFirestoreDislike("remove")
        }
        }
    }

    render(){
        //console.log(this.props)
        return(<>
        <li>
            <button>
            {this.state.likeUpdated?<i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handleLike}></i>:<i class="fa fa-thumbs-o-up" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handleLike}></i>}
              <span>{this.state.likes}</span>
            </button>
            <button style={{marginLeft: '7px'}}>
            {this.state.dislikesUpdated?<i class="fa fa-thumbs-down" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handledislikes}></i>:<i class="fa fa-thumbs-o-down" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handledislikes}></i>}
              <span>{this.state.dislikes}</span>
            </button>
          </li>
          <li>
            <a>{this.props.length} Comments</a>
          </li>
          </>)
    }
}

export default SocialCount;