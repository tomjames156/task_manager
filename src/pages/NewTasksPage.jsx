import {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import TemplatePage from './TemplatePage'

function NewTasksPage() {
    const {user} = useContext(AuthContext)
  
    return (
      <TemplatePage 
        user={user} 
        tasks_type='new'
        page_title='New Tasks'
        section_text='These tasks were assigned to you recently'
      />
    )
}

export default NewTasksPage