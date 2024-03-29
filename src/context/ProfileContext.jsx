import { useReducer, createContext, useContext} from "react";
import { useNavigate } from "react-router-dom";
import ProfileReducer from "./ProfileReducer";
import AuthContext from "./AuthContext";

const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
    const mover = useNavigate()
    const api = process.env.REACT_APP_API_LINK
    const host = process.env.REACT_APP_BASE_URL
    const {authTokens} = useContext(AuthContext)
    const initialState = {
        isLoading: false,
        accountDialog: false,
        confirmDialog: false,
        profile: {},
        friends: {},
        following: {},
        followers: {},
        publicProfile: {},
        initating: false,
        searchQuery: ''
    }

    let [state, dispatch] = useReducer(ProfileReducer, initialState)

    const getProfile = async () => {
        dispatch({type: 'LOADING'})
        try{
            let response = await fetch(`${api}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })
            let data = await response.json()
            dispatch({
                type: 'GET_PROFILE',
                payload: data
            })
            console.log(data)
        }catch(err){
            console.log(err)
        }
        dispatch({type: 'STOP_LOADING'})
    }

    const updateProfile = async (formData) => {
        dispatch({type: 'LOADING'})
        try{
            let response = await fetch(`${api}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                },
                body: JSON.stringify(formData)
            })

            let data = await response.json()
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: data
            })
        }catch(err){
            console.log(err)
        }
        dispatch({type: 'STOP_LOADING'})
    }

    const openDialog = (e) => {
        e.preventDefault()
        dispatch({type: 'OPEN_DIALOG'})
    }

    const closeDialog = (e) => {
        e.preventDefault()
        dispatch({type: 'CLOSE_DIALOG'})
    }

    const openConfirmation = (e) => {
        e.preventDefault()
        dispatch({type: 'OPEN_CONFIRMATION'})
    }

    const closeConfirmation = (e) => {
        e.preventDefault()
        dispatch({type: 'CLOSE_CONFIRMATION'})
        closeDialog(e)
    }

    const closeAllDialogs = () => {
        dispatch({type: 'CLOSE_DIALOG'})
        dispatch({type: 'CLOSE_CONFIRMATION'})
    }

    const updateProfilePic = async (e, fileInputRef) => {
        e.preventDefault()
        let image = new FormData()
        image.append('profile_pic', fileInputRef.current.files[0])
        try{
            let response = await fetch('http://127.0.0.1:8000/api/profile/update_profile_image', {
            method: 'POST',
            headers: {
                'Authorization': `Access-Key ${authTokens?.access}`
            },
            body: image
            })
            let data = await response.json()
            dispatch({
                type: 'UPDATE_PROFILE_PIC',
                payload: data.profile_pic
            })
        }catch(err){
            console.log(err)
        }
    }

    const getPublicProfile = async (username) => {
        dispatch({type: 'LOADING'})
        try{
            let response = await fetch(`${api}/public_profile/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
            }
            })
            if (response.status === 404){
                mover('/404')
            }
        let data = await response.json()
        dispatch({
            type: 'GET_PUBLIC_PROFILE',
            payload: data
        })
        }catch(err){
          console.log(err)
        }
        dispatch({type: 'STOP_LOADING'})
    }

    const clearSearchQuery = () => {
        dispatch({type: 'CLEAR_SEARCH_QUERY'})
    }

    const updateSearchQuery = (q) => {
        dispatch({
            type: 'UPDATE_SEARCH_QUERY',
            payload: q
        })
    }

    const startLoading = () => {
        dispatch({type: 'LOADING'})
    }

    const stopLoading = () => {
        dispatch({type: 'STOP_LOADING'})
    }

    const initiateFollow = () => {
        dispatch({type: 'INITIATE_FOLLOW'})
    }

    const completeFollow = () => {
        dispatch({type: 'FOLLOW_COMPLETE'})
    }

    const startFriendship = async (friend_name) => {
        initiateFollow()
        try{
            await fetch(`${api}/friends/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                },
                body: JSON.stringify({username: friend_name})
            })
        }catch(err){
            console.log(err)
        }
        completeFollow()
    }

    const getFriends = async () => {
        try{
            let response = await fetch(`${api}/friends`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })

            let data = await response.json()
            dispatch({
                type: 'GET_FRIENDS',
                payload: data
            })
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    const getFollowing = async () => {
        try{
            let response = await fetch(`${api}/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })

            let data = await response.json()
            dispatch({
                type: 'GET_FOLLOWING',
                payload: data
            })
        }catch(err){
            console.log(err)
        }
    }

    const getFollowers = async () => {
        try{
            const response = await fetch(`${api}/followers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })
            const data = await response.json()
            dispatch({
                type: 'GET_FOLLOWERS',
                payload: data
            })
        }catch(err){
            console.log(err)
        }
    }

    const contextData = {
        api,
        host,
        profile: state.profile,
        isLoading: state.isLoading,
        accountDialog: state.accountDialog,
        confirmDialog: state.confirmDialog,
        publicProfile: state.publicProfile,
        searchQuery: state.searchQuery,
        friends: state.friends,
        following: state.following,
        followers: state.followers,
        initiating: state.initating,
        getProfile,
        updateProfile,
        openDialog,
        closeDialog,
        openConfirmation,
        closeConfirmation,
        closeAllDialogs,
        updateProfilePic,
        getPublicProfile,
        clearSearchQuery,
        updateSearchQuery,
        startLoading,
        stopLoading,
        startFriendship,
        getFriends,
        getFollowing,
        getFollowers
    }

    return(
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext