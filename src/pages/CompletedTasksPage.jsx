import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import TemplatePage from './TemplatePage'

const CompletedTaskPage = () => {
  const {user} = useContext(AuthContext)

  return (
    <TemplatePage 
      user={user} 
      tasks_type='completed'
      page_title='Completed Tasks'
      section_text='Great work completing all these tasks🙂'
      hasFooter={false}
    />
  )
}

export default CompletedTaskPage