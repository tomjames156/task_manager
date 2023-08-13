import { createContext, useContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const TasksContext = createContext()
export default TasksContext

export const TasksProvider = ({children}) => {
    const api = process.env.REACT_APP_API_LINK
    const {authTokens, setMessage, logoutUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)
    const [newTasks, setNewTasks] = useState([])

    const getNewTasks = async () => {
        const response = await fetch(`${api}/tasks/new/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access-Key ${authTokens?.access}`
            }
        })
        const data = await response.json()
        if(response.status === 200){
            setNewTasks(data)
        }else if(response.statusText === "Unauthorized"){
            setMessage('Your login session expired')
            logoutUser()
        }else{
            logoutUser()
        }
    }


    useEffect(() => {
        getNewTasks()
    }, [])

    const contextData = {
        newTasks,
        isLoading,
        setIsLoading
    }

  return (
        <TasksContext.Provider value={contextData}>
            {children}
        </TasksContext.Provider>
  )
}
