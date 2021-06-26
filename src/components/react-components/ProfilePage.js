import React from 'react';
import firebase from '../data_components/firebase';

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            developers: []
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            var uid = firebase.auth().currentUser.uid;

var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);

var isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

var isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
};

firebase.database().ref('.info/connected').on('value', function(snapshot) {
    // If we're not currently connected, don't do anything.
    if (snapshot.val() === false) {
        return;
    };

    userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
        
        userStatusDatabaseRef.set(isOnlineForDatabase);
    });
});
        },4000)
    }
    
    render(){
        return(
            <>
            
            </>
        );
    }
}

export default ProfilePage;