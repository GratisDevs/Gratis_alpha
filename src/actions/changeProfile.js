import firebase from '../components/data_components/firebase';

const db=firebase.firestore();

export const changeProfile=(image, uid)=>(dispatch)=>{
    var data = new FormData();

    data.append('image',image);
    fetch('https://snaptok.herokuapp.com/changeProfile',{
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
      }).then(res=>res.json()).then(res=>{
        dispatch(changeImage(res["URL"]));
        db.collection("users").where("uid","==",uid).get().then(query=>{
          const doc=query.docs[0];
          doc.ref.update({photoURL: res["URL"]});
        }).catch(err=>{console.log(err)})
      }).catch(err=>{console.log(err)});
}

const changeImage=(URL)=>({
    type: 'CHANGE_PROFILE',
    payload: URL
})
