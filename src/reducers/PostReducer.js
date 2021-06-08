export const postState=(state={
    isLoading: true,
    posts:[],
    errMess: null
},action)=>{
    switch(action.type){
        case 'FETCH_SUCCESS': return {...state,isLoading: false,posts: state.posts.concat(action.payload)}
        case 'FETCH_FAILED': return {...state,isLoading: false,errMess: action.payload}
        case 'CHANGE_POST_LOADING': return {...state, isLoading: true} 
        case 'DELETE_POST': return{...state,posts: state.posts.filter(post=>post._id!==action.payload)}
        default: return state;
    }
}