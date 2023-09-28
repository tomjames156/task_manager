import { useContext } from "react"
import TasksContext from "../../context/TasksContext"

function UrgencyKey({shown}) {
    const {setShowUrgencyKey} = useContext(TasksContext)

  return (
    shown &&
    <div className='key'>
        <div>
            <span></span>
            <span>- Past Due Date</span>
        </div>
        <div>
            <span></span>
            <span>- Due Today</span>
        </div>
        <div>
            <span></span>
            <span>- Due Tomorrow</span>
        </div>
        <div>
            <span></span>
            <span>- Due in 2 days</span>
        </div>
        <div>
            <span></span>
            <span>- 3 days or more</span>
        </div>
        <button onClick={() => {setShowUrgencyKey(false)}}>CLOSE</button>
    </div>
  )
}

export default UrgencyKey