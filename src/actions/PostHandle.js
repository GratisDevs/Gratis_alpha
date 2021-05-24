const baseURL='http://snaptok.herokuapp.com/'

export const submitPost=(postAuthor,postAuthorEmail,postTitle,postDescription,postSubGratis,postImage,postVideo,changeLoading)=>(dispatch)=>{

    var data=new FormData();
    data.append('author',postAuthor);
    data.append('email',postAuthorEmail);
    data.append('title',postTitle);
    data.append('description',postDescription);
    data.append('file',postImage?postImage:postVideo);
    data.append('subGratis',postSubGratis);
    data.append('dateOfPost',new Date().toISOString());
    data.append('likes',0);
    data.append('claps',0);

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
