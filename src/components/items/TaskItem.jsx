function TaskItem({task_obj}) {
    const date = new Date(task_obj.due_date)
  return (
    <div className='task-item' style={{background: task_obj.task_colour}}><p>{task_obj.body}</p><span className='date'>{date.toDateString().slice(3,)}</span>{task_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i className="fa-solid fa-circle-check"></i>}</div>
  )
}

export default TaskItem