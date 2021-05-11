import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDj20VBDkd05ST-gPVHTWv8_NxoeCtD1aA",
    authDomain: "gratis-3ce5a.firebaseapp.com",
    databaseURL: "https://gratis-3ce5a.firebaseio.com",
    projectId: "gratis-3ce5a",
    storageBucket: "gratis-3ce5a.appspot.com",
    messagingSenderId: "348041992874",
    appId: "1:348041992874:web:b27f691625e1a97332ced3",
    measurementId: "G-PNXHN4YXYF"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
