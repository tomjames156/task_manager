import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import TaskItem from "../../components/items/TaskItem"
import Header from "../../components/sectioning/Header"
import TaskContext from "../../context/TaskContext"

function UpdateViewTaskPage() {
    let {current_task, getTask} = useContext(TaskContext)
    let params = useParams()

    useEffect(() => {
        getTask(params.id)
    }, [])

    return (
        <div className="container">
          <Header/>
          <main> 
            <TaskItem task_obj={current_task}/>
          </main>
        </div>
    )
}

export default UpdateViewTaskPage