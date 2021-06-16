import { useState } from 'react';
import React from 'react';
import {  onMessageListener } from './firebaseInit';

export const Messaging=()=>{
    const [message, setMessage]=useState('');
    onMessageListener()
    .then((payload) => {
      const { value } = payload.data;
      //console.log(payload.data+" received");
      setMessage(value);
    })
    .catch((err) => {
      //toast.error(JSON.stringify(err));
    });

    
    return(
        <h1>{message}</h1>
    );
}