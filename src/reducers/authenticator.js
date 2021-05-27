export const userState=(state={isLoading: true,isLoggedIn: false,userName: '', photoURL: ''},action)=>{
    switch(action.type){
        case 'LOGIN': return {...state,isLoading: false,isLoggedIn: true, userName: action.payload.userName, photoURL: action.payload.photoURL, email: action.payload.email}
        case 'LOGOUT': return {...state,isLoading: false,isLoggedIn:false,userName: '',photoUrl: ''}
        case 'CHANGE': return {...state,isLoading: false}
        default: return {...state}
    }
}