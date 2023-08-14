import {useContext} from 'react'
import TaskUrgencyTemplatePage from "./TasksUrgencyTemplatePage"
import AuthContext from "../context/AuthContext"

function UrgencyViewPage() {
    const {user} = useContext(AuthContext)

    return (
        <TaskUrgencyTemplatePage 
            user={user}
            tasks_type='urgency'
            section_text='You can view the tasks in order of their urgency'
            page_title='Tasks Urgency'
            hasFooter={true}
        />
    )
}

export default UrgencyViewPage