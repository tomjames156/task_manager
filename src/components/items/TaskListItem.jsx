import { useNavigate, useLocation } from "react-router-dom"

function TaskListItem({task_obj}) {
  const date = new Date(task_obj.due_date)
  const mover = useNavigate()
  const locator = useLocation()

  const openTask = () => {
    localStorage.setItem('opened_from', locator.pathname)
    mover(`/task/${task_obj.id}`)
  }


  return (
    <div onClick={openTask} className='task-item' style={{background: task_obj.task_colour}}><p>{task_obj.header}</p><span className='date'>{date.toDateString().slice(3,)}</span>{task_obj?.completed ?<i className="fa-solid fa-circle-check"></i>: <i class="fa-solid fa-circle-xmark"></i> }</div>
  )
}

export default TaskListItem