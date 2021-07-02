import React from 'react';
import { connect } from 'react-redux';
import firebase, { db } from '../data_components/firebase';
import {changeProfile} from '../../actions/changeProfile';
import { withStyles } from '@material-ui/styles';
import style from './LeftsideStyle';
import { fetchPosts } from '../../actions/PostHandle';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import  TextField from '@material-ui/core/TextField';
import Button from 'react-bootstrap/Button';
import Feed from './Feed';
import BallLoader from './BallLoader';
import CommentedPost from './CommentedPost';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{padding: '10px 0'}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const styles=theme=>({
      tab:{
              padding: '10px 0'
      }
  })
  
  
  

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
            favorites: [],  //to contain posts hearted by user,
            value: 0,
            setBioUpdate: false,
            bio: '',
            isOnline: '',
        }
    }

    tabChange=(ev, newValue)=>{
        this.setState({
            value: newValue
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

    changeBio=()=>{
        db.collection("users").where("uid","==",this.state.userId).get().then(query=>{
			const document=query.docs[0];
            document.ref.update({
                bio: this.state.bio
            })
            this.setState({
                setBioUpdate: false
            })
		});
    }

    fetchLikedPosts=(likes)=>{
        fetch(baseUrl+'likedPosts',{
            method: 'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({likes: likes})
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
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({hearts: hearts})
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
                bio: doc.data().bio,
                isUserLoading: false
            },()=>{
                this.fetchLikedPosts(doc.data().likes);
                this.fetchFavorite(doc.data().hearts);
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
        }).then(res=>res.json()).then(res=>this.setState({comments: res})).catch(err=>console.log(err));
    }

    handleChange=(ev)=>{
		
		const image=ev.target.files[0];
	
		if(image===''||image===undefined){
			alert("Not an image!");
			return;
		}

		this.props.dispatch(changeProfile(image, this.props.uid));
		
	}

    componentDidMount(){
        this.fetchUserData();
        this.fetchPosts(this.state.userId);
        this.fetchComments(this.state.userId);
        var userStatusDatabaseRef = firebase.database().ref('/status/' + this.state.userId);
        userStatusDatabaseRef.on('child_changed',(snapshot)=>{
            userStatusDatabaseRef.once('value',(data)=>{
                var obj=data.val();
                
                if(obj.state==='online')
                    this.setState({
                        isOnline: 'online'
                    })
            else
                {
                    var time=new Date(obj.last_changed);
                    this.setState({
                    isOnline: "Last seen:"+time.getDate()+"-"+time.getMonth()+"-"+time.getFullYear()+" at "+time.getHours()+":"+time.getMinutes(),
                })
            }
            })
        })
    }

    componentWillUnmount(){
        console.log("profile unmounted");
    }

    render(){

        const {classes} =this.props;
        
        return(
            <>
            {this.props.uid?(
            
            <div className="container-fluid">
                <div className="row" style={{marginTop: '100px'}}>
                <div className="col-md-2"></div>
                <div className="col-md-8 col-12">

                <style.ArtCard>
                    {this.state.isUserLoading?<BallLoader />:(<style.UserInfo>
                    <style.CardBackground />
                    <div>
                        {this.state.userId===this.props.uid?<style.Photo url={this.props.photoURL} />:<style.Photo url={this.state.userData.photoURL} />}
                        <style.Link style={{textAlign: 'left'}}>{this.state.userData.displayName}</style.Link>
                    </div>
                    <div id="bio-field">
                        {this.state.setBioUpdate?(<>
                            <TextField id="outlined-basic" label="Add Bio" multiline 
                            rowsMax={4} 
                            variant="outlined"
                            value={this.state.bio}
                            onChange={(ev)=>this.setState({bio: ev.target.value})} />
                            <Button color="primary" style={{marginTop: '8px', marginLeft: '5px'}}>
                                Update
                            </Button></>):(<><p style={{marginLeft: '0px'}}>{this.state.bio}</p>{this.props.uid===this.state.userId&&<i class="fa fa-pencil-square-o" aria-hidden="true" 
                            style={{fontSize: 'larger'}}
                            onClick={()=>this.setState({setBioUpdate: true})}></i>}</>)}
                    </div>
                    <div className="row">
                            <div className="col-md-12" style={{display: 'flex',justifyContent: 'left'}}>
                                <span style={{color: 'green', fontWeight: 'bold'}}>{this.state.isOnline}</span>
                            </div>
                    </div>
                    {this.props.uid===this.state.userId?(<><input type="file" 
                    accept="image/*" 
                    id="file" 
                    style={{display: 'none'}} 
                    onChange={(ev)=>{this.handleChange(ev)}} />
                        <style.AddPhotoText htmlFor="file">Add a photo</style.AddPhotoText></>):<></>}
                    <p></p>
                    </style.UserInfo>
        )}
                    </style.ArtCard>
                    
                    <Tabs variant="fullWidth" value={this.state.value} onChange={this.tabChange} aria-label="simple tabs example">
                        <Tab label="Posts" {...a11yProps(0)} />
                        <Tab label="Liked" {...a11yProps(1)} />
                        <Tab label="Comments" {...a11yProps(2)} />
                        {this.props.uid===this.state.userId&&<Tab label="Hearts" {...a11yProps(3)} />}
                    </Tabs>
                    <TabPanel value={this.state.value} index={0} >
                        {this.state.isUserLoading?<BallLoader />:<Feed posts={this.state.posts} uid={this.props.uid} />}
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        {this.state.isUserLoading?<BallLoader />:<Feed posts={this.state.likedPost} uid={this.props.uid} />}
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        {this.state.isUserLoading?<BallLoader />:<CommentedPost comments={this.state.comments} uid={this.props.uid} />}
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3}>
                        {this.state.isUserLoading?<BallLoader />:<Feed posts={this.state.favorites} uid={this.props.uid} />}
                    </TabPanel>
                    
                </div>
                <div className="col-md-2"></div>
            </div></div>):<Loading />}
            </>
        );
    }
}

const mapStateToProps=(state)=>({
    photoURL: state.userState.photoURL
})

export default connect(mapStateToProps)(withStyles(styles)(ProfilePage));