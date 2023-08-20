import { useReducer, createContext, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import TaskReducer from "./TaskReducer"
import AuthContext from "./AuthContext"
import TasksContext from "./TasksContext"

const TaskContext = createContext()

export default TaskContext

export const TaskProvider = ({children}) => {
    const mover = useNavigate()
    const {authTokens} = useContext(AuthContext)
    const {setIsLoading} = useContext(TasksContext)
    const initialState = {
        current_task : null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    const getTask = async (pk) => {
        setIsLoading(true)
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/task/${pk}`)
            const data = await response.json()
            dispatch({
                type: 'GET_TASK',
                payload: data
            })
        }catch(err){
            alert('Failed To Fetch')
        }
        setIsLoading(false)
    }

    const updateTask = async (e, formData) => {
        e.preventDefault()
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/task/${state.current_task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            let data = await response.json()
            dispatch({
                action: 'UPDATE_TASK',
                payload: data
            })
            mover('/')
        }catch(err){
            alert('Failed to Fetch')
        }
    }

    const deleteTask = async (e) => {
        e.preventDefault()
        await fetch(`http://127.0.0.1:8000/api/task/${state.current_task.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        dispatch({
            action: 'DELETE_TASK',
            payload: {}
        })
        mover(-1)
    }

    const createTask = async (e, formData) => {
        e.preventDefault()
        try{
            let response = await fetch("http://127.0.0.1:8000/api/tasks/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
            let data = await response.json()
            dispatch({
                action: 'CREATE_TASK',
                payload: data 
            })
        }catch(err){
            console.log(err)
        }
        mover('/')
    }

    let contextData = {
        current_task: state.current_task,
        dispatch,
        getTask,
        updateTask,
        deleteTask,
        createTask
    }

    return(
        <TaskContext.Provider value={contextData}>
            {children}
        </TaskContext.Provider>
    )
}
