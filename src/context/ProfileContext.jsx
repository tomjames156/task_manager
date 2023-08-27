import { useReducer, createContext, useContext} from "react";
import ProfileReducer from "./ProfileReducer";
import AuthContext from "./AuthContext";

const ProfileContext = createContext()

export const ProfileProvider = ({children}) => {
    const api = process.env.REACT_APP_API_LINK
    const {authTokens} = useContext(AuthContext)
    const initialState = {
        isLoading: false,
        accountDialog: false,
        confirmDialog: false,
        profile: {}
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

    const contextData = {
        profile: state.profile,
        isLoading: state.isLoading,
        accountDialog: state.accountDialog,
        confirmDialog: state.confirmDialog,
        getProfile,
        updateProfile,
        openDialog,
        closeDialog,
        openConfirmation,
        closeConfirmation,
        closeAllDialogs
    }

    return(
        <ProfileContext.Provider value={contextData}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext