import {useState, useEffect} from 'react'

function TaskItem({task_obj}) {
  const [header, setHeader] = useState('')
  const [description, setDescription] = useState('')
  const fileInput = document.querySelector('input[type="file"]')

  useEffect(() => {
    setHeader(task_obj.header)
  }, [task_obj])

  return (
    <div className="taskItem" style={{background: task_obj.task_colour}} >
      <form action="">
        <input type="text" name="header" placeholder="Add a Header" onChange={(e) => setHeader(e.target.value)} value={header || ''} />
        <textarea rows={10} name="description" placeholder="Add a Description" onChange={(e) => setDescription(e.target.value)} value={description || ''} />
        <div className="task-options-friends">
          <div className='task-options'>
            <i className="fa-solid fa-image fa-lg" title='Add Image' onClick={() => {fileInput.click()}}></i>
            <i className="fa-solid fa-users fa-lg" title='Assign to Friends'></i>
          </div>
          <div className='assigned_friends'>
            <p>Assigned Friends</p>
          </div>
        </div>
        <input style={{display: 'none'}} type="file" />
        <div className='file_names'></div>
        <div className='save-cancel-btns'>
          <button className='cancel'type='submit'>Cancel</button>
          <button className='save' type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default TaskItem