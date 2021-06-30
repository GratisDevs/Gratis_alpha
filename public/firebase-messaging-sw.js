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

const messagechannel=new MessageChannel();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/firebase-logo.png'
  };
  self.clients.matchAll({
    includeUncontrolled: 'true'
  }).then(function(clients){
    console.log(clients);
    clients[0].postMessage({data: notificationTitle});
  })
  return self.registration.hideNotification();
  });

  self.addEventListener('activate', event => {console.log(Clients);event.waitUntil(self.clients.claim())});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
