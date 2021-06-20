import firebase from './components/data_components/firebase';
import 'firebase/messaging';

const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });


export const onMessageListener = () =>{
    
  return new Promise((resolve) => {
    messaging.onMessage((payload) => {
        //console.log(payload);
      resolve(payload);
    });
  });}