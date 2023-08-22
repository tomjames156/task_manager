const ProfileReducer = (state, action) =>{
    switch(action.type){
        case 'GET_PROFILE':
            return {...state, profile: action.payload}
        case 'LOADING':
            return {...state, isLoading: true}
        case 'STOP_LOADING':
            return {...state, isLoading: false}
        default:
            return state
    }
}


export default ProfileReducer