import { useContext } from 'react'
import TaskContext from '../../context/TaskContext'

function DeleteDialog() {
    const {dialogOpen, closeDeleteDialog, deleteTask} = useContext(TaskContext)

  return (
    <div className={`delete-dialog ${dialogOpen ? 'dialog-shown' : ''}`}>
        <p>Are you sure you want to delete this task?</p>
        <div>
            <button onClick={() => closeDeleteDialog()} className="cancel">Cancel</button>
            <button onClick={deleteTask} className="delete-task">Delete</button>
        </div>
    </div>
  )
}

export default DeleteDialog