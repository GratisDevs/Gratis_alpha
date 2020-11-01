export const login=(userName)=>({
    type: 'LOGIN',
    payload: userName
})

export const logout=()=>({
    type: 'LOGOUT'
})