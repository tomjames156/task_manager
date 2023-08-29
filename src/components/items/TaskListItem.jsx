import { useNavigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import ProfileContext from "../../context/ProfileContext"

function TaskListItem({task_obj}) {
  const date = new Date(task_obj.due_date)
  const mover = useNavigate()
  const locator = useLocation()
  const {profile, host} = useContext(ProfileContext)

  const openTask = () => {
    localStorage.setItem('opened_from', locator.pathname)
    mover(`/task/${task_obj.id}`)
  }


  return (
    <div onClick={openTask} className='task-item' style={{background: task_obj.task_colour}}><p>{task_obj.header}</p><span className='date'>{date.toDateString().slice(3,)}</span>{task_obj?.completed ?<i className="fa-solid fa-circle-check"></i>: <i className="fa-solid fa-circle-xmark"></i> }{task_obj?.user_profile?.username === profile.username ? <img src={`${host}${profile.profile_pic}`} alt="Your profile picture" className="assigner-img" title="You assigned this"/> : <img className="assigner-img" title={`${task_obj?.user_profile?.username} assigned this`} alt={`${task_obj?.user_profile?.username}'s profile pic`} src={`${host}${task_obj?.user_profile?.profile_pic}`} />}</div>
  )
}

export default TaskListItem