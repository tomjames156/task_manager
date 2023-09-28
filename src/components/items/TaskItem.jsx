import {useState, useEffect, useContext} from 'react'
import { motion } from 'framer-motion'
import TaskContext from '../../context/TaskContext'
import Loader from './Loader'
import TasksContext from '../../context/TasksContext'
import AuthContext from '../../context/AuthContext'
import LogoutDialog from '../dialogs/LogoutDialog'
import DeleteDialog from '../dialogs/DeleteDialog'
import ProfileContext from '../../context/ProfileContext'
import UserItemAssign from './UserItemAssign'

function TaskItem({task_obj}) {
  const colours = ['#34ccff', '#e4f78f', '#ffc983', '#ffa0a1', '#b99aff']
  const [assignTo, setAssignTo] = useState([])
  const {logoutDialog, setLogoutDialog} = useContext(AuthContext)
  const fileInput = document.querySelector('input[type="file"]')
  const {isLoading, setIsLoading} = useContext(TasksContext)
  const {openDeleteDialog, dialogOpen, updateTask, createTask, cancel, closeDeleteDialog, assign, startAssigning, cancelAssigning} = useContext(TaskContext)
  const [inputs, setInputs] = useState({
    header: '',
    description: '',
    due_date: '',
    completed: false,
    task_colour: '#34ccff'
  })
  const {friends, getFriends} = useContext(ProfileContext)

  useEffect(() => {
    closeDeleteDialog()
    getFriends()
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
    setLogoutDialog(false)
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

  const assignToUser = (username) => {
    // setAssignTo(prevState => prevState.push(username))
    // console.log(assignTo)
  }

  if(isLoading){
    return (<Loader />)
  }else{
    return (
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}} 
        style={{position: 'relative'}} >
        {(!logoutDialog && dialogOpen) && <DeleteDialog/>}
        {logoutDialog && <LogoutDialog/>}
        <div className="taskItem" style={{background: inputs.task_colour || '#34ccff', filter: dialogOpen || logoutDialog ? 'brightness(0.7)': 'none',pointerEvents: dialogOpen || logoutDialog ? 'none': 'auto' }} >
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
                <p onClick={startAssigning}>Assigned Friends</p>
                {assign && <>
                <div className='assignTask'>
                  <p>Assign To:</p>{friends.length > 1 && friends.map((friend, index) => <UserItemAssign onClick={() => console.log('grah')} key={index} user_obj={friend}/>)}
                  <div className='buttons'>
                    <div className='close' onClick={cancelAssigning}>Close</div>
                    <div className='assign' onClick={cancelAssigning}>Assign</div>
                  </div>
                </div>
                </>}
              </div>
            </div>
            <input style={{display: 'none'}} type="file" />
            <div className='file_names'></div>
            <div className='crud-btns'>
                {task_obj !== null && <div className='delete-btn'>
                  <button id='delete' title="Delete Task" onClick={(e) => {e.preventDefault(); openDeleteDialog()}}>Delete</button>
                  </div>}
              <div className='color-btns'>
              {colours.map((colour, index) => <div key={index} style={{'background': colour, 'width': '30px', 'height': '30px', borderRadius: '50%', border: 'solid 1px black'}} onClick={() =>handleChangeColor(colour)}></div>)}
              </div>
              <div className='save-cancel-btns'>
                <button className='cancel' title='Cancel' onClick={(e) => {e.preventDefault(); cancel()}}>Cancel</button>
                {task_obj !== null ? <button className='save' title="Update Task" type='submit'>Update</button> : <button className='save' title="Save Task" type='submit' >Save</button>}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    )
  }
}

export default TaskItem