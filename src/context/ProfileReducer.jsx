import { act } from "react-dom/test-utils"

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
        default:
            return state
    }
}


export default ProfileReducer