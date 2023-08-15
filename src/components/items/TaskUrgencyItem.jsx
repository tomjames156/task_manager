import dayjs from "dayjs"

function TaskUrgencyItem({task_obj}) {
    const date = new Date(task_obj.due_date)
    var today = new Date()
    var task_due = dayjs(date)
    // let duration = today.diff(task_due)
    console.log(task_due)

    let urgency_colours = {
        0 : '#d3d3d3',
        1 : '#ffa0a1',
        2 : '#ffc983',
        3 : '#e4f78f',
        4 : '#b99aff',
    }

    let urgency_text = {
        0 : 'Past Due date',
        1 : 'Due today',
        2 : 'Due tomorrow',
        3 : '2 days left',
        4 : '3+ days left',
    }

    return (
        <div className='task-item' style={{background: urgency_colours[task_obj.urgency]}}><p>{task_obj.body}</p><span className='date'>{urgency_text[task_obj.urgency]}</span>{task_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i className="fa-solid fa-circle-check"></i>}</div>
    )
}

export default TaskUrgencyItem