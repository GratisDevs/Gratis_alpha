export const postState=(state={
    isLoading: true,
    posts:[],
    errMess: null
},action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS': return {...state,isLoading: false,posts: action.payload}
        case 'FETCH_FAILED': return {...state,isLoading: false,errMess: action.payload}
        default: return state
    }
}