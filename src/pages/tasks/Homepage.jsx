import React, { useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import TasksContext from '../../context/TasksContext'
import TemplatePage from '../templates/TemplatePage'

const Homepage = () => {
  const {user} = useContext(AuthContext)
  const {newTasks} = useContext(TasksContext)  

  return(
    <TemplatePage 
      user={user} 
      tasks_type='' 
      page_title='Taskify'
      hasFooter={true}
      section_text={newTasks.length > 0 ? `You have ${newTasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`}
    />
  )
}

// newTasks.length > 0 ? `You have ${newTasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`

export default Homepage