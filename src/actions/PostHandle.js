const baseURL='http://localhost:8080/'

export const submitPost=(postAuthor,postAuthorEmail,postTitle,postDescription,postSubGratis,postImage,postVideo,changeLoading)=>(dispatch)=>{

    var data=new FormData();
    var today=new Date();
    data.append('author',postAuthor);
    data.append('email',postAuthorEmail);
    data.append('title',postTitle);
    data.append('description',postDescription);
    data.append('file',postImage?postImage:postVideo);
    data.append('fileType',postImage!==''||postVideo!==''?(postImage?'image':'video'):'')
    data.append('subGratis',postSubGratis);
    data.append('dateOfPost',today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear());
    data.append('likes',0);
    data.append('dislikes',0);

    fetch(baseURL+'post',{
        method: 'POST',
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

export const fetchPosts=()=>(dispatch)=>{
  fetch(baseURL+'fetchPosts',{
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
  })
  .then(res=>res.json()).then((arr)=>{dispatch(addPost(arr))}).
  catch(err=>{dispatch(errPost(err.message))})
}

const addPost=(arr)=>({
  type: 'FETCH_SUCCESS',
  payload: arr
})

const errPost=(message)=>({
  type: 'FETCH_FAILED',
  payload: message
})
