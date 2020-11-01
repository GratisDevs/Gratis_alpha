export const userState=(state={isLoggedIn: false,userName: ''},action)=>{
    switch(action.type){
        case 'LOGIN': return {...state,isLoggedIn: true, userName: action.payload}
        case 'LOGOUT': return {...state,isLoggedIn:false}
        default: return {...state}
    }
}