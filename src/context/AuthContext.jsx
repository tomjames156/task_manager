import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// if the interceptor tutorial flops just npm install fetch-intercept and check the docs

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const api = process.env.REACT_APP_API_LINK
    const navigator = useNavigate()
    const [isLoadingToken, setIsLoadingToken] = useState(true)
    const [logoutDialog, setLogoutDialog] = useState(false)
    const [message, setMessage]= useState('')

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // using a calback instead of a the direct evaluation enhaces performance by making sure this function runs only once on the initial render

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch(`${api}/token/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "username": e.target.username.value,
                    "password": e.target.password.value
                }
            )
        })

        let data = await response.json()
        e.target.reset()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            sessionStorage.setItem('just_logged', true)
            navigator('/')
        }else{
            setMessage('Incorrect details provided')
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setMessage('Logged out successfully')
        localStorage.removeItem('authTokens')
        navigator('/login')
    }


    const signUpUser = async (formData) => {
        try{
            await fetch(`${api}/users/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        }
        catch(err){
            console.log("Sign Up Failed")
        }
    }

    const refreshToken = async () => {
        try{
            let response = await fetch(`${api}/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'refresh': authTokens?.refresh
                    })
            })
            let data = await response.json()
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }catch(err){
            logoutUser() // logout user if anything doesn't work or in case of funny business like user made use of an expired token🙄
            setMessage('Login Expired')
        }
        setIsLoadingToken(false)
    }

    useEffect(() => {
        if(isLoadingToken){
            refreshToken()
        }

        let refresh_time = 1000 * 30

        let interval = setInterval(() => {
            if(authTokens){
                refreshToken()
            }
        }, refresh_time)

        return () => clearInterval(interval)
    }, [authTokens, isLoadingToken])

    const contextData = {
        loginUser, 
        user,
        logoutUser,
        authTokens,
        message, 
        setMessage,
        logoutDialog,
        setLogoutDialog,
        signUpUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {isLoadingToken ? null : children}
        </AuthContext.Provider>
    )
}