export const userState=(state={isLoggedIn: false,userName: '', photoURL: ''},action)=>{
    switch(action.type){
        case 'LOGIN': return {...state,isLoggedIn: true, userName: action.payload.userName, photoURL: action.payload.photoURL}
        case 'LOGOUT': return {...state,isLoggedIn:false,userName: '',photoUrl: ''}
        default: return {...state}
    }
}