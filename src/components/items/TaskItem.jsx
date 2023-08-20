import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import TaskContext from '../../context/TaskContext'
import Loader from './Loader'
import TasksContext from '../../context/TasksContext'

function TaskItem({task_obj}) {
  const colours = ['#34ccff', '#e4f78f', '#ffc983', '#ffa0a1', '#b99aff']
  const [dialogOpen, setDialogOpen] = useState(false)
  const fileInput = document.querySelector('input[type="file"]')
  const mover = useNavigate()  
  const {isLoading, setIsLoading} = useContext(TasksContext)
  const {deleteTask, updateTask, createTask} = useContext(TaskContext)
  const [inputs, setInputs] = useState({
    header: '',
    description: '',
    due_date: '',
    completed: false,
    task_colour: '#34ccff'
  })

  useEffect(() => {
    if(task_obj !== null){
      setInputs({
        header: task_obj?.header,
        description: task_obj?.description,
        due_date: task_obj?.due_date.toString().substring(0,16),
        completed: task_obj?.completed,
        task_colour: task_obj?.task_colour
      })
    }
    setIsLoading(false)
  }, [task_obj])

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setInputs({...inputs, [name]: value})
  }

  const handleChangeColor = (color) => {
    setInputs({...inputs, task_colour: color})
  }

  const handleCompletedInput = (e) => {
    setInputs({...inputs, completed: e.target.checked})
  }


  if(isLoading){
    return (<Loader />)
  }else{
    return (
      <div style={{position: 'relative'}}>
        <div className={`delete-dialog ${dialogOpen ? 'dialog-shown' : ''}`}>
          <p>Are you sure you want to delete this task?</p>
          <div>
              <button onClick={() => setDialogOpen(false)} className="cancel">Cancel</button>
              <button onClick={deleteTask} className="delete-task">Delete</button>
          </div>
        </div>
        <div className="taskItem" style={{background: inputs.task_colour || '#34ccff', filter: dialogOpen ? 'brightness(0.7)': 'none' }} >
          <form onSubmit={(e) => {task_obj == null ? createTask(e, inputs) : updateTask(e, inputs)}}>
            <input type="text" required name="header" placeholder="Add a Header" onChange={handleInputChange} value={inputs.header || ''} />
            <textarea required={true} rows={10} name="description" placeholder="Add a Description" onChange={handleInputChange} value={inputs.description || ''} />
            <label htmlFor="due_date">Due Date:</label>
            <input name='due_date' id="due_date" onChange={handleInputChange} value={inputs.due_date || ''} type="datetime-local" placeholder='Add Due Date' />
            <label style={{fontWeight: 'bold'}} htmlFor="completed">Completed:</label>
            <input checked={inputs.completed || false} onChange={handleCompletedInput} type="checkbox" name="completed" id="completed" />
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
            <div className='crud-btns'>
                {task_obj !== null && <div className='delete-btn'>
                  <button title="Delete Task" onClick={(e) => {e.preventDefault(); setDialogOpen(true)}}>Delete</button>
                  </div>}
              <div className='color-btns'>
              {colours.map((colour, index) => <div key={index} style={{'background': colour, 'width': '30px', 'height': '30px', borderRadius: '50%', border: 'solid 1px black'}} onClick={() =>handleChangeColor(colour)}></div>)}
              </div>
              <div className='save-cancel-btns'>
                <button className='cancel' title='Cancel' onClick={(e) => {e.preventDefault(); mover('/')}}>Cancel</button>
                {task_obj !== null ? <button className='save' title="Update Task" type='submit'>Update</button> : <button className='save' title="Save Task" type='submit' >Save</button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TaskItem