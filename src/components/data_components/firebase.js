import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBK1M8DFyZnA9WfdRFrugPBNgoi2BVtFRc",
    authDomain: "gratis-ba8ad.firebaseapp.com",
    databaseURL: "https://gratis-ba8ad.firebaseio.com",
    projectId: "gratis-ba8ad",
    storageBucket: "gratis-ba8ad.appspot.com",
    messagingSenderId: "578392857968",
    appId: "1:578392857968:web:4aa7693230aa5e7b6a03b5",
    measurementId: "G-7B8J09KDJF"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
