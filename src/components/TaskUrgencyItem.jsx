function TaskUrgencyItem({task_obj}) {
    const date = new Date(task_obj.due_date)

    let urgency_colours = {
        0 : '#d3d3d3',
        1 : '#ffa0a1',
        2 : '#ffc983',
        3 : '#e4f78f',
        4 : '#b99aff',
    }

    return (
        <div className='task-item' style={{background: urgency_colours[task_obj.urgency]}}><p>{task_obj.body}</p><span className='date'>{date.toDateString().slice(3,)}</span>{task_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i className="fa-solid fa-circle-check"></i>}</div>
    )
}

export default TaskUrgencyItem