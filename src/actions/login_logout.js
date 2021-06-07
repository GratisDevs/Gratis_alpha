const loginUser=(userName, photoURL, email, uid)=>({
    type: 'LOGIN',
    payload: {userName: userName,photoURL:photoURL, email: email,uid: uid}
})

export const logout=()=>({
    type: 'LOGOUT'
})

export const changeLoading=()=>({
    type: 'CHANGE'
})

export const login=(userName, photoURL, email,uid)=>(dispatch)=>{
    dispatch(loginUser(userName, photoURL, email, uid));
}