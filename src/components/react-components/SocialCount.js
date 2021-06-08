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
            postId: props.postId,
            baseUrl: 'http://snaptok.herokuapp.com/',
            db: firebase.firestore()
        }
    }

    componentDidMount(){
        this.state.db.collection("users").where("displayName","==",this.state.user).get().then(query=>{
            const doc=query.docs[0];
            this.setState({
                likeUpdated: doc.data().likes.includes(this.state.postId),
            })
        })
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

    handleLike=()=>{
        if(this.state.likeUpdated){
            this.setState((prevState,props)=>({
                likeUpdated: false,
                likes: prevState.likes-1
            }))
            this.sendLikeRequests("decrease");
            this.handleFirestoreLike("remove");
        }
        else{
            this.setState((prevState,props)=>({
                likeUpdated: true,
                likes: prevState.likes+1
            }))
            this.sendLikeRequests("increase");
            this.handleFirestoreLike("add");
        }
    }


    render(){
        //console.log(this.props)
        return(<>
        <li>
            <button>
            {this.state.likeUpdated?<i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize: 'x-large'}} onClick={this.handleLike}></i>:<i class="fa fa-thumbs-o-up" aria-hidden="true" style={{fontSize: 'x-large'}} onClick={this.handleLike}></i>}
              <span style={{marginLeft: '4px', color: 'rgba(0,0,0,0.8)', fontSize: 'larger'}}>{this.state.likes}</span>
            </button>
          </li>
          </>)
    }
}

export default SocialCount;