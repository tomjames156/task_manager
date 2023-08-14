import {useContext} from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../components/Header'
import TaskItem from '../components/TaskItem'
import HomepageKey from '../components/HomepageKey'
import Loader from '../components/Loader'
import TasksContext from '../context/TasksContext'
import useFetchTasks from '../hooks/useFetchTasks'

function TemplatePage({page_title, tasks_type, user, hasFooter, section_text}) {
    const {isLoading} = useContext(TasksContext)
    let {tasks} = useFetchTasks(tasks_type)

    return (
        <div className='container'>
          <Header></Header>
          <main>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. {tasks.length > 0 && section_text}</p>}.
                {tasks.length > 0 ? 
                <div className='tasks'>
                {tasks.map((task) => {
                    return <TaskItem key={task.id} task_obj={task}></TaskItem>
                    })}
                </div> : <h3 style={{color: 'red'}}>You have no {tasks_type} tasks</h3>}
            </>}
            {hasFooter && <HomepageKey/>}
          </main>
        </div>
      )
}

TemplatePage.defaultProps = {
    hasFooter: false
}

export default TemplatePage