import {useContext} from 'react'
import Header from '../components/Header'
import TaskUrgencyItem from '../components/TaskUrgencyItem'
import UrgencyKey from '../components/UrgencyKey'
import Loader from '../components/Loader'
import TasksContext from '../context/TasksContext'
import useFetchTasks from '../hooks/useFetchTasks'

function TaskUrgencyTemplatePage({page_title, tasks_type, user, hasFooter, section_text}) {
    const {isLoading} = useContext(TasksContext)
    let {tasks} = useFetchTasks(tasks_type)

    return (
        <div className='container'>
          <Header></Header>
          <main>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. {tasks.length > 0 && section_text}</p>}.
                {tasks ? 
                <div className='tasks'>
                {tasks.map((task) => {
                    return <TaskUrgencyItem key={task.id} task_obj={task}></TaskUrgencyItem>
                    })}
                </div> : <h2>You have no {tasks_type} tasks</h2>}
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