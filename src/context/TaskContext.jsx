import { useReducer, createContext } from "react"
import TaskReducer from "./TaskReducer"

const TaskContext = createContext()

export default TaskContext

export const TaskProvider = ({children}) => {
    const initialState = {
        current_task : null
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState)

    const getTask = async (pk) => {
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
    }

    let contextData = {
        current_task: state.current_task,
        dispatch,
        getTask
    }

    return(
        <TaskContext.Provider value={contextData}>
            {children}
        </TaskContext.Provider>
    )
}
