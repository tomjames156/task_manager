import dayjs from 'dayjs'

function TaskUrgencyItem({task_obj}) {    

    const calculateTimeLeft = (due_date) => {
        const time_params = ['year', 'month', 'day', 'hour', 'minute', 'second']
        const date = new Date(due_date)
        let today = new Date()
        let task_due = dayjs(date)
        today = dayjs(today)

        if (today > task_due){
            return 'Past due date'
        }else{
            for(let i = 0; i < time_params.length; i++){
                let duration = today.diff(task_due, time_params[i])
                if (duration === 0){
                    continue
                }
                
                if(duration === -1){
                    return `${duration.toString().substring(1)} ${time_params[i]} left`
                }else{
                    return `${duration.toString().substring(1)} ${time_params[i]}s left`
                }
                
            }
        }
    }

    const time_left = calculateTimeLeft(task_obj.due_date)

    let urgency_colours = {
        0 : '#d3d3d3',
        1 : '#ffa0a1',
        2 : '#ffc983',
        3 : '#e4f78f',
        4 : '#b99aff',
    }

    return (
        <div className='task-item' style={{background: urgency_colours[task_obj.urgency]}}><p>{task_obj.body}</p><span className='date'>{time_left}</span>{task_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i className="fa-solid fa-circle-check"></i>}</div>
    )
}

export default TaskUrgencyItem