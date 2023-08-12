import {useContext} from 'react'
import Header from '../components/Header'
import TaskItem from '../components/TaskItem'
import AuthContext from '../context/AuthContext'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

function TemplatePage({page_title, tasks, user, hasFooter, new_tasks}) {
    const {isLoading} = useContext(AuthContext)
    return (
        <div className='container'>
          <Header></Header>
          <main>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. {new_tasks.length > 0 ? `You have ${new_tasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`}</p>}.
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
    hasFooter: true,
    new_tasks: []
}

export default TemplatePage