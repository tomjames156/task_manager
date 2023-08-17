import React, {useContext} from 'react'
import Header from '../../components/sectioning/Header'
import TaskListItem from '../../components/items/TaskListItem'
import HomepageKey from '../../components/sectioning/HomepageKey'
import Loader from '../../components/items/Loader'
import TasksContext from '../../context/TasksContext'
import useFetchTasks from '../../hooks/useFetchTasks'
import AuthContext from '../../context/AuthContext'
import TaskContext from '../../context/TaskContext'

function TemplatePage({page_title, tasks_type, user, hasFooter, section_text, logout}) {
    const {isLoading, pathMatch} = useContext(TasksContext)
    const {logoutUser} = useContext(AuthContext)
    let {tasks} = useFetchTasks(tasks_type)

    return (
        <div className='container'>
          <Header></Header>
          <main>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>{pathMatch('/') && <>Hi there 👋🏾, <strong>{user.username}</strong></>}{tasks && section_text}</p>}
                <br/>
                {tasks.length > 0 ? 
                <div className='tasks'>
                {tasks.map((task) => {
                    return <TaskListItem key={task.id} task_obj={task}></TaskListItem>
                    })}
                </div> : <h3 style={{color: 'red'}}>You have no {tasks_type} tasks</h3>}
            </>}
            {hasFooter && <HomepageKey/>}
            {logout && <span style={{ marginTop: '1rem', textAlign: 'right' }} className='logout_btn' title="Sign Out"  onClick={logoutUser}><i color='red' className="fa-solid fa-right-from-bracket fa-lg"></i>Sign out</span> }
          </main>
        </div>
      )
}

TemplatePage.defaultProps = {
    hasFooter: false
}

export default TemplatePage