import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

let useFetch = () => {
    const {authTokens, setAuthTokens, setUser} = useContext(AuthContext)

    const baseURL = 'http://127.0.0.1:8000'

    const originalRequest = async (url, config) => {
        let response = await fetch(`${baseURL}${url}`, config)
        let data = await response.json()
        return {response, data}
    }

    const refreshToken = async (token) => {
        let response = await fetch(`${baseURL}/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': `${token}`
            })
        })
        let data = await response.json()
        console.log(data)
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
        return data
    } 

    const callFetch = async (url) => {
        let user = jwtDecode(authTokens.access)
        let isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    
        if(isExpired){
            await refreshToken(authTokens.refresh)
        }
    
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access-Key ${authTokens.access}`
            }
        }
    
        let {response, data} = await originalRequest(url, config)
        return {response, data}
    } 

    return callFetch
}

export default useFetch;