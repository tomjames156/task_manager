import { useReducer, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import TaskReducer from "./TaskReducer"
import AuthContext from "./AuthContext"
import TasksContext from "./TasksContext"

const TaskContext = createContext()

export default TaskContext

export const TaskProvider = ({children}) => {
    const mover = useNavigate()
    const api = process.env.REACT_APP_API_LINK
    const {authTokens} = useContext(AuthContext)
    const {setIsLoading} = useContext(TasksContext)
    const initialState = {
        current_task : null,
        dialogOpen: false
    }
    let opened_from = localStorage.getItem('opened_from')

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    const getTask = async (pk) => {
        setIsLoading(true)
        try{
            const response = await fetch(`${api}/task/${pk}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })
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
            const response = await fetch(`${api}/task/${state.current_task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                },
                body: JSON.stringify(formData)
            })
            let data = await response.json()
            dispatch({
                action: 'UPDATE_TASK',
                payload: data
            })
            opened_from !== null ? mover(opened_from): mover('/')
        }catch(err){
            alert('Failed to Fetch')
        }
    }

    const deleteTask = async (e) => {
        e.preventDefault()
        await fetch(`${api}/task/${state.current_task.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Access-Key ${authTokens?.access}`
          }
        })
        dispatch({
            action: 'DELETE_TASK',
            payload: {}
        })
        opened_from !== null ? mover(opened_from): mover('/')
    }

    const createTask = async (e, formData) => {
        e.preventDefault()
        try{
            let response = await fetch(`${api}/tasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Access-Key ${authTokens?.access}`
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
        opened_from !== null ? mover(opened_from): mover('/')
    }

    const cancel = () => {
        opened_from !== null ? mover(opened_from): mover('/')
    }

    const openDeleteDialog = () => {
        dispatch({type: 'OPEN_DIALOG'})
    }

    const closeDeleteDialog = () => {
        dispatch({type: 'CLOSE_DIALOG'})
    }

    let contextData = {
        current_task: state.current_task,
        dialogOpen: state.dialogOpen,
        dispatch,
        getTask,
        cancel,
        updateTask,
        deleteTask,
        createTask,
        openDeleteDialog,
        closeDeleteDialog
    }

    return(
        <TaskContext.Provider value={contextData}>
            {children}
        </TaskContext.Provider>
    )
}
