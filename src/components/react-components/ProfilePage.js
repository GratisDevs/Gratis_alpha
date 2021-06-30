import React from 'react';
import { connect } from 'react-redux';
import firebase, { db } from '../data_components/firebase';
import {changeProfile} from '../../actions/changeProfile';
import style from './LeftsideStyle';
import { fetchPosts } from '../../actions/PostHandle';

const baseUrl='https://snaptok.herokuapp.com/';

class ProfilePage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isUserLoading: true,
            userId: this.props.match.params.id,
            userData: null,  //fetch user's document from firestore which contains all details about user
            posts: [],  //to contain post shared by user
            comments: [],  //to contain comments by users on different posts
            likedPost: [],  //to contain posts liked by user
            favorites: []  //to contain posts hearted by user
        }
    }

    fetchLikedPosts=(likes)=>{
        fetch(baseUrl+'likedPosts',{
            method: 'POST',
            headers:{
                "Content-Type" : "appliication/json"
            },
            body: JSON.stringify(likes)
        }).then(res=>res.json()).then(res=>{
            this.setState({
                likedPost: res
            })
        })
    }

    fetchFavorite=(hearts)=>{
        fetch(baseUrl+'favoritePosts',{
            method: 'POST',
            headers:{
                "Content-Type" : "appliication/json"
            },
            body: JSON.stringify(hearts)
        }).then(res=>res.json()).then(res=>{
            this.setState({
                favorites: res
            })
        })
    }

    fetchUserData=()=>{
        db.collection("users").where("uid","==",this.state.userId).get().then(query=>{
            const doc=query.docs[0];
            this.setState({
                userData: doc.data(),
                isUserLoading: false
            },()=>{
                fetchLikedPosts(doc.data().likes);
                fetchFavorite(doc.data().heart);
            })
        })
    }

    fetchPosts=(userId)=>{
        fetch(baseUrl+'fetchUserPosts',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: userId})
        }).then(res=>res.json()).then(res=>{
            this.setState({
                posts: res
            })
        })
    }

    fetchComments=(userId)=>{
        fetch(baseUrl+'commentedPosts',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: userId})
        }).then(res=>res.json()).then(res=>{
            this.setState({
                comments: res
            })
        })
    }

    componentDidMount(){
        fetchUserData();
        fetchPosts(this.state.userId);
        fetchComments(this.state.userId);
    }

    render(){
        return(
            <div className="row m-0">
                <div className="col-md-2"></div>
                <div className="col-md-8 col-12">
                    <style.ArtCard>
                        <style.UserInfo>
                        <style.CardBackground />
                        <div>
                            <style.Photo url={this.props.photoURL}/>
                            <style.Link>Welcome, {this.props.userName}!</style.Link>
                        </div>
                        
                        <input type="file" 
                        accept="image/*" 
                        id="file" 
                        style={{display: 'none'}} 
                        onChange={(ev)=>{this.handleChange(ev)}} />
                            <style.AddPhotoText htmlFor="file">Add a photo</style.AddPhotoText>
                        </style.UserInfo>
                    </style.ArtCard>
                    <style.Article>
                        
                    </style.Article>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>({
    uid: state.userState.uid,
    userName: state.userState.userName,
    photoURL: state.userState.photoURL
})

export default connect(mapStateToProps)(ProfilePage);