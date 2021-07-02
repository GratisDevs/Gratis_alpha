import firebase from "../components/data_components/firebase";

const baseURL='http://snaptok.herokuapp.com/'

export const submitPost=(postAuthor,userProfile, uid, postAuthorEmail,postTitle,postDescription,postSubGratis,postImage,postVideo,changeLoading)=>async(dispatch)=>{

    var data=new FormData();
    var today=new Date();
    data.append('author',postAuthor);
    data.append('email',postAuthorEmail);
    data.append('uid',uid);
    data.append('title',postTitle);
    data.append('description',postDescription.replace(/\"/g,"\'"));
    data.append('file',postImage?postImage:postVideo);
    data.append('fileType',postImage!==''||postVideo!==''?(postImage?'image':'video'):'')
    data.append('subGratis',postSubGratis);
    data.append('dateTime',today.toISOString());
    data.append('likes',0);
    data.append('dislikes',0);
    const idToken=await firebase.auth().currentUser.getIdToken();
    fetch(baseURL+'post',{
        method: 'POST',
        headers:{
          "FIREBASE_AUTH_TOKEN": idToken
        },
        body: data
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
      })
    .then(response => {changeLoading()})
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });

}

export const fetchPosts=(category)=>async(dispatch)=>{
  dispatch(changePostsLoading())
  const idToken=await firebase.auth().currentUser.getIdToken();
  fetch(baseURL+'fetchPosts',{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      "FIREBASE_AUTH_TOKEN": idToken
    },
    body: JSON.stringify({category: category})
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
  }).then(res=>res.json()).then((arr)=>{dispatch(addPost(arr))}).catch(err=>{dispatch(errPost(err.message))})
}

const addPost=(arr)=>({
  type: 'FETCH_SUCCESS',
  payload: arr
})

const errPost=(message)=>({
  type: 'FETCH_FAILED',
  payload: message
})


const changePostsLoading=()=>({
  type: 'CHANGE_POST_LOADING'
})

export const deletePostFromStore=(id)=>(dispatch)=>{
  dispatch(deletePost(id));
}

const deletePost=(id)=>({
  type: 'DELETE_POST',
  payload: id
})