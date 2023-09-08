const ProfileReducer = (state, action) =>{
    switch(action.type){
        case 'GET_PROFILE':
            return {...state, profile: action.payload}
        case 'LOADING':
            return {...state, isLoading: true}
        case 'STOP_LOADING':
            return {...state, isLoading: false}
        case 'UPDATE_PROFILE':
            return {...state, profile: action.payload}
        case 'UPDATE_PROFILE_PIC':
            return {
                ...state, 
                profile: {
                    ...state.profile, 
                    profile_pic: action.payload
                }
            }
        case 'CLEAR_SEARCH_QUERY':
            return {...state, searchQuery: ''}
        case 'UPDATE_SEARCH_QUERY':
            return {...state, searchQuery: action.payload}
        case 'GET_PUBLIC_PROFILE':
            return {...state, publicProfile: action.payload}
        case 'OPEN_DIALOG':
            return {...state, accountDialog: true}
        case 'CLOSE_DIALOG':
            return {...state, accountDialog: false}
        case 'OPEN_CONFIRMATION':
            return {...state, confirmDialog:  true}
        case 'CLOSE_CONFIRMATION':
            return {...state, confirmDialog: false}
        default:
            return state
    }
}


export default ProfileReducer