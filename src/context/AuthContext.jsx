import { createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

// if the interceptor tutorial flops just npm install fetch-intercept and check the docs

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const api = process.env.REACT_APP_API_LINK
    const navigator = useNavigate()
    const [isLoadingToken, setIsLoadingToken] = useState(true)
    const [message, setMessage] = useState('')

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    // using a calback instead of a the direct evaluation enhaces performance by making sure this function runs only once on the initial render

    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const loginUser = async(e) => {
        e.preventDefault()
        setMessage(null)
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
            navigator('/')
        }else{
            setMessage(data)
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigator('/login')
    }

    const refreshToken = async () => {
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
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else if(response.status === 401){
            logoutUser()
        }else{
            logoutUser() // logout user if anything doesn't work or in case of funny business like user made use of an old token🙄
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
        setMessage
    }

    return(
        <AuthContext.Provider value={contextData}>
            {isLoadingToken ? null : children}
        </AuthContext.Provider>
    )
}