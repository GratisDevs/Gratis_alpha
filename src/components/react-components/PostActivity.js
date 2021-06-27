import React from 'react';
import Comment from './Comment';
import Comments from './Comments';

class PostActivity extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments: props.comments,
            userProfile: '/images/user.svg',
            isLoading: false
        }
    }

    componentDidMount(){
        this.props.socket.on(this.props.postId,(data)=>{
            if(data.type==='COMMENT_DELETED')
                this.setState({
                    comments: this.state.comments.filter(comment=>comment._id!==data.commentId)
                })
            else if(data.type==='COMMENT_ADDED')
                this.setState({
                    comments: [data.res].concat(this.state.comments),
                    isLoading: false
                })
            else if(data.type==='POST_DELETED'){
                this.props.postDeleted();
            }
        })
    }

    addReply=(commentId, reply)=>{
        const newComments=this.state.comments.map(comment=>{
            if(comment._id!==commentId) return comment;
            return {...comment, replies: [...comment.replies,reply]};
        });
        this.setState({
            comments: newComments
        })
    }

    removeReply=(commentId, replyId)=>{
        const updatedComments = this.state.comments.map(comment => {
            
            if (comment._id !== commentId) {
              return comment;
            }
        
            const filteredReplies = comment.replies.filter(reply => reply._id !== replyId);
            return {
              ...comment,
              replies: filteredReplies,
            };
          });
          this.setState({
              comments: updatedComments
          })
    }

    deleteComment=(id)=>{
        fetch('https://snaptok.herokuapp.com/deleteComment',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({postId: this.props.postId, commentId: id})
        }).then(res=>res.json()).catch(err=>alert("Your comment could not be deleted!"));
    }
    addComment=(props)=>{
        var today=new Date();
        this.setState({isLoading: true});
        fetch('https://snaptok.herokuapp.com/postComment',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: this.props.postId,comment: props,
                commentAuthor: this.props.userName, uid: this.props.uid,
                userProfile: this.props.userProfile,
                dateOfComment: today})
        }).then(res=>res.json()).catch(err=>alert(err));
    }
    render(){
        
        return(
            <>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10" style={{display: 'flex', justifyContent: 'center', padding: '3px 15px'}}>
                    <Comment userProfile={this.props.userProfile} 
                    addComment={this.addComment} isLoading={this.state.isLoading} />
                </div>
                <div className="col-md-1"></div>
            </div>
            <hr />
            <div>
                <Comments 
                comments={this.state.comments}
                addReply={this.addReply} 
                removeReply={this.removeReply}
                userProfile={this.props.userProfile}
                author={this.props.userName}
                postId={this.props.postId}
                deleteComment={this.deleteComment} 
                uid={this.props.uid} 
                socket={this.props.socket} 
                />
            </div>
            </>
        );
    }
}

export default PostActivity;