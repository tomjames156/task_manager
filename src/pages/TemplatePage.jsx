import {useContext} from 'react'
import Header from '../components/Header'
import TaskItem from '../components/TaskItem'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import TasksContext from '../context/TasksContext'
import useFetchTasks from '../hooks/useFetchTasks'

function TemplatePage({page_title, tasks_type, user, hasFooter, section_text}) {
    const {isLoading} = useContext(TasksContext)
    const {tasks} = useFetchTasks(tasks_type)

    return (
        <div className='container'>
          <Header></Header>
          <main>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. {section_text}</p>}.
                {tasks && 
                <div className='tasks'>
                {tasks.map((task) => {
                    return <TaskItem key={task.id} task_obj={task}></TaskItem>
                    })}
                </div>}
            </>}
            {hasFooter && <Footer/>}
          </main>
        </div>
      )
}

TemplatePage.defaultProps = {
    hasFooter: false
}

export default TemplatePage