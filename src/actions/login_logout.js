const loginUser=(userName, photoURL, email)=>({
    type: 'LOGIN',
    payload: {userName: userName,photoURL:photoURL, email: email}
})

export const logout=()=>({
    type: 'LOGOUT'
})

export const changeLoading=()=>({
    type: 'CHANGE'
})

export const login=(userName, photoURL, email)=>(dispatch)=>{
    dispatch(loginUser(userName, photoURL, email));
}