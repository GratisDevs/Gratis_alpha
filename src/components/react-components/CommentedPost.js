import React from 'react';
import style from './MainStyle';
import { Link } from 'react-router-dom';
import AuthorProfile from './AuthorProfile';

class CommentedPost extends React.Component{
    render(){
        if(this.props.comments.length===0){
            return(
                <h6>No posts to show</h6>
            );
        }
        else
            return(
            <>{
                this.props.comments.map(post=>{
                    var date=new Date(post.dateTime);
                    return(<style.Article>
                        <style.SharedActor>
                        <a>
                            <AuthorProfile uid={post.uid} />
                            <div style={{display: 'flex',flexDirection: 'column'}}>
                            <div><Link to={`/profile/${post.uid}`} style={{textDecoration: 'none', color: 'black'}}><h6 style={{marginTop: '14px', textAlign: 'left'}}className="title-style">{post.author}</h6></Link></div>
                            </div>
                        </a>
                        </style.SharedActor>
                        <div className="row" style={{marginLeft: '5px'}}>
                            <div className="col-md-12">
                                <Link to={`/post/${post._id}`} style={{textDecoration: 'none', color: 'black'}}><h5 style={{textAlign: 'left'}} className="title-style">{post.title}</h5></Link>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'flex-start', marginLeft: '5px', paddingLeft: '15px'}}>
                        <span style={{marginRight: '5px', color: 'rgba(0,0,0,0.8)'}}>{date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()} at </span>
                        <span style={{color: 'rgba(0,0,0,0.8)'}}>{date.getHours()+":"+date.getMinutes()}</span>
                        </div>
                        <hr />
                        {
                            post.comments.map(comment=>{
                                var date=new Date(comment.dateOfComment);
                                return(<><div style={{display: 'flex', padding: '0 5px'}}>
                    <AuthorProfile uid={comment.uid} />
                    <div style={{display: 'flex', flexDirection: 'column', 
                    textAlign: 'left', width: '-webkit-fill-available',marginLeft: '5px'}}>
                        <div style={{display: 'flex'}}><Link to={`/profile/${comment.uid}`}><span style={{color: 'rgba(0,0,0,0.6)', fontWeight: '700'}}>{comment.commentAuthor}</span></Link>
                        <span style={{marginLeft: '8px', color: 'rgba(0,0,0,0.5)'}}>{date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()} 
                        at {date.getHours()+":"+date.getMinutes()}</span></div>
                        <p style={{marginLeft: '0px',fontStyle: 'Source Sans Pro, sans-serif'}}>{comment.comment}</p>
                    </div>
                    </div><hr /></>)
                            })
                        }
                    </style.Article>)
                })
            }</>
        );
    }
}

export default CommentedPost;