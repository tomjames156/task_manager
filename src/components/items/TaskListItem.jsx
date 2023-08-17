import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import TaskContext from "../../context/TaskContext"

function TaskListItem({task_obj}) {
  const {current_task, getTask} = useContext(TaskContext)
  const date = new Date(task_obj.due_date)
  const mover = useNavigate()

  const openTask = (id) => {
    getTask(id)
    mover(`/task/${id}`)
  }

  return (
    <div onClick={() => {openTask(task_obj.id)}} className='task-item' style={{background: task_obj.task_colour}}><p>{task_obj.header}</p><span className='date'>{date.toDateString().slice(3,)}</span>{task_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i className="fa-solid fa-circle-check"></i>}</div>
  )
}

export default TaskListItem