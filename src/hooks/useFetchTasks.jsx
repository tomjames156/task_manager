import {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import TasksContext from '../context/TasksContext'

function useFetchTasks (endpoint) {
    const api = process.env.REACT_APP_API_LINK
    const {authTokens} = useContext(AuthContext)
    const {setIsLoading} = useContext(TasksContext)
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const url = `${api}/tasks/${endpoint}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })
            const data = await response.json()
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            setTasks(null)
            setError(error)
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return {tasks, error}
}

export default useFetchTasks