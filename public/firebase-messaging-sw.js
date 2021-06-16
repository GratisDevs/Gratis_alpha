importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

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
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  fetch('https://firestore.googleapis.com/v1beta1/projects/gratis-3ce5a/databases/(default)/documents:runQuery',{
    
  })
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});