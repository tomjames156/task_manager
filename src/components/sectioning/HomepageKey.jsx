import { useContext } from "react"
import TasksContext from "../../context/TasksContext"
import PropTypes from 'prop-types'

function HomepageKey({shown}) {
  const {setShowHomeKey} = useContext(TasksContext)

  return (
    shown && 
    <div className='key'>
        <div>
          <i className="fa-solid fa-circle-xmark"></i>
          <span>- Not Completed</span>
        </div>
        <div>
          <i className="fa-solid fa-circle-check"></i>
          <span>- Completed</span>
        </div>
        <div>
          <i className='fa-solid fa-user'></i>
          <span>- Self Assigned</span>
        </div>
        <button onClick={() => setShowHomeKey(false)}>CLOSE</button>
      </div>

  )
}

HomepageKey.propTypes = {
  shown: PropTypes.bool
}

HomepageKey.defaultProps = {
  shown: false
}

export default HomepageKey