import {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import TemplatePage from '../templates/TemplatePage'

function IncompleteTasksPage() {
    const {user} = useContext(AuthContext)
  
    return (
      <TemplatePage 
        user={user} 
        tasks_type='incomplete'
        page_title='Incomplete Tasks'
        section_text='These are tasks you have not completed'
      />
    )
}

export default IncompleteTasksPage