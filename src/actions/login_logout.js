export const login=(userName, photoURL, email)=>({
    type: 'LOGIN',
    payload: {userName: userName,photoURL:photoURL, email: email}
})

export const logout=()=>({
    type: 'LOGOUT'
})