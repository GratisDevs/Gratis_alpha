import React from 'react';

class SocialCount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            likes: this.props.likes,
            likeUpdated: false,
            dislikes: this.props.dislikes,
            dislikesUpdated: false,
            postId: this.props.postId,
            baseUrl: 'http://snaptok.herokuapp.com/'
        }
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
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    likes: prevState.likes+1,
                    likeUpdated: true
                }
            })
            this.sendLikeRequests("increase");
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
            }
            else{this.setState((prevState,props)=>{
                return{
                    likes: prevState.likes-1,
                    likeUpdated: false
                }
            })
            this.sendLikeRequests("decrease");
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
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    dislikes: prevState.dislikes+1,
                    dislikesUpdated: true
                }
            })
            this.sendDislikeRequests("increase");
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
            }
            else{
            this.setState((prevState,props)=>{
                return{
                    dislikes: prevState.dislikes-1,
                    dislikesUpdated: false
                }
            })
            this.sendDislikeRequests("decrease");
        }
        }
    }

    render(){
        return(<>
        <li>
            <button>
            {this.state.likeUpdated?<i class="fa fa-thumbs-up" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handleLike}></i>:<i class="fa fa-thumbs-o-up" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handleLike}></i>}
              <span>{this.state.likes}</span>
            </button>
            <button>
            {this.state.dislikesUpdated?<i class="fa fa-thumbs-down" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handledislikes}></i>:<i class="fa fa-thumbs-o-down" aria-hidden="true" style={{fontSize: 'large'}} onClick={this.handledislikes}></i>}
              <span>{this.state.dislikes}</span>
            </button>
          </li>
          <li>
            
            <a>{this.props.length}</a>
          </li>
          </>)
    }
}

export default SocialCount;