import { useState } from 'react';
import React from 'react';
import {  onBackgroundMessageListener, onMessageListener } from './firebaseInit';

const messagechannel=new MessageChannel();

export const Messaging=()=>{
    const [message, setMessage]=useState('');
    onMessageListener()
    .then((payload) => {
      console.log(payload);
      const { value } = payload.data.title;
      console.log(value);
      setMessage(payload.data.title);
    })
    .catch((err) => {
      //toast.error(JSON.stringify(err));
    });

    navigator.serviceWorker.onmessage = (event) => {
      console.log(event.data);
    };

    
    return(
        <h1>{message}</h1>
    );
}