import { post } from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import {db} from '../data_components/firebase.js';
import firebase from '../data_components/firebase.js';


class SocialCount extends React.Component{
    constructor(props){
        super(props);
        //console.log(props);
        this.state={
            likes: props.likes,
            likeUpdated: false,
            baseUrl: 'https://snaptok.herokuapp.com/'
        }
    }

    componentDidMount(){
        db.collection("users").where("uid","==",this.props.uid).get().then(query=>{
            const doc=query.docs[0];
            this.setState({
                likeUpdated: doc.data().likes.includes(this.props.postId),
            })
        })
    }



    sendLikeRequests=(props)=>{
        fetch(this.state.baseUrl+'like',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"id":this.props.postId,"action": props})
        }).then(res=>res.json()).catch(err=>err);
    }

    handleFirestoreLike=(props)=>{
        db.collection("users").where("uid","==",this.props.uid).get().then(query=>{
			const document=query.docs[0];
            if(props=="add")
                document.ref.update({
                    likes: firebase.firestore.FieldValue.arrayUnion(this.props.postId)
                });
            else
                document.ref.update({
                    likes: firebase.firestore.FieldValue.arrayRemove(this.props.postId)
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
            {this.state.likeUpdated?<i class="fa fa-thumbs-up icon-thumbs-up" aria-hidden="true" style={{fontSize: 'x-large', color: '#007acc'}} onClick={this.handleLike}></i>
            :<i class="fa fa-thumbs-o-up" aria-hidden="true" style={{fontSize: 'x-large'}} onClick={this.handleLike}></i>}
              <span style={{marginLeft: '4px', color: 'rgba(0,0,0,0.8)', fontSize: 'larger'}}>{this.state.likes}</span>
            </button>
          </li>
          </>)
    }
}

export default SocialCount;