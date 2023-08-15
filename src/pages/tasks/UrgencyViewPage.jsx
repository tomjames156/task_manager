import {useContext} from 'react'
import TaskUrgencyTemplatePage from '../templates/TasksUrgencyTemplatePage'
import AuthContext from '../../context/AuthContext'

function UrgencyViewPage() {
    const {user} = useContext(AuthContext)

    return (
        <TaskUrgencyTemplatePage 
            user={user}
            tasks_type='urgency'
            section_text='These are your incomplete tasks arranged in order of their urgency'
            page_title='Tasks Urgency'
            hasFooter={true}
        />
    )
}

export default UrgencyViewPage