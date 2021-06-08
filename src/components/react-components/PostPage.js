import React from 'react';
import ReactMarkdown from 'react-markdown';

class PostPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post: {}
        }
    }

    componentDidMount(){
        fetch('https://snaptok.herokuapp.com/fetchPost/'+this.props.postId,{
            method: 'GET'
        }).then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          error => {
                throw error;
          }).then(res=>res.json()).then((res=>this.setState({
              post: res
          }))).catch(err=>{console.log(err);})
    }
    render(){
        return(
            <p style={{marginTop: '100px'}}><ReactMarkdown source={this.state.post.description}></ReactMarkdown></p>
        );
    }
}

export default PostPage;