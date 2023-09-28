import { useContext } from "react"
import TasksContext from "../../context/TasksContext"
import PropTypes from 'prop-types'

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

UrgencyKey.propTypes = {
    shown: PropTypes.bool
}

UrgencyKey.defaultProps = {
    shown: false
}

export default UrgencyKey