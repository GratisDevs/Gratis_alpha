export const login=(userName, photoURL)=>({
    type: 'LOGIN',
    payload: {userName: userName,photoURL:photoURL}
})

export const logout=()=>({
    type: 'LOGOUT'
})