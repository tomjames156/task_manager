import {useContext} from 'react'
import Header from '../../components/sectioning/Header'
import TaskUrgencyItem from '../../components/items/TaskUrgencyItem'
import UrgencyKey from '../../components/sectioning/UrgencyKey'
import Loader from '../../components/items/Loader'
import TasksContext from '../../context/TasksContext'
import AuthContext from '../../context/AuthContext'
import useFetchTasks from '../../hooks/useFetchTasks'
import LogoutDialog from '../../components/dialogs/LogoutDialog'

function TaskUrgencyTemplatePage({page_title, tasks_type, user, hasFooter, section_text}) {
    const {isLoading} = useContext(TasksContext)
    const {logoutDialog} = useContext(AuthContext)
    let {tasks} = useFetchTasks(tasks_type)

    return (
        <div className='container'>
          <Header></Header>
          {logoutDialog && <LogoutDialog/>}
          <main style={{filter: logoutDialog ? 'brightness(0.7)' : 'none', pointerEvents: logoutDialog ? 'none': 'auto'}}>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>{tasks.length > 0 && section_text}</p>}.
                {tasks.length > 0 ? 
                <div className='tasks'>
                  {tasks.map((task) => {
                    return <TaskUrgencyItem key={task.id} task_obj={task}></TaskUrgencyItem>
                    })}
                </div> : <h3 style={{color: 'red', marginBottom: '0.5rem'}}>You have no tasks</h3>}
            </>}
            {hasFooter && <UrgencyKey/>}
          </main>
        </div>
      )
}

TaskUrgencyTemplatePage.defaultProps = {
    hasFooter: false
}

export default TaskUrgencyTemplatePage