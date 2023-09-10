import React, {useContext, useEffect} from 'react'
import Header from '../../components/sectioning/Header'
import TaskListItem from '../../components/items/TaskListItem'
import HomepageKey from '../../components/sectioning/HomepageKey'
import Loader from '../../components/items/Loader'
import TasksContext from '../../context/TasksContext'
import useFetchTasks from '../../hooks/useFetchTasks'
import AuthContext from '../../context/AuthContext'
import LogoutDialog from '../../components/dialogs/LogoutDialog'
import ProfileContext from '../../context/ProfileContext'

function TemplatePage({page_title, tasks_type, user, hasFooter, section_text, logout}) {
    const {isLoading, pathMatch} = useContext(TasksContext)
    const {logoutDialog, setLogoutDialog} = useContext(AuthContext)
    const {getProfile, clearSearchQuery} = useContext(ProfileContext)
    let {tasks} = useFetchTasks(tasks_type)

    useEffect(() => {
      setLogoutDialog(false)
      getProfile()
    }, [])

    return (
        <div className='container'>
          <Header></Header>
          {logoutDialog && <LogoutDialog/>}
          <main style={{filter: logoutDialog ? 'brightness(0.7)' : 'none', pointerEvents: logoutDialog ? 'none': 'auto'}}>
            {isLoading ? <Loader/>: <>
                <h1 className='tasks-header'>{page_title}</h1>
                {user && <p className='welcome-text'>{pathMatch('/') && <>Hi there 👋🏾, <strong>{user.username}</strong>. </>}{tasks && section_text}</p>}
                <br/>
                {tasks.length > 0 ? 
                <div className='tasks' style={{display: 'relative'}}>
                {tasks.map((task) => {
                    return <TaskListItem key={task.id} task_obj={task}></TaskListItem>
                    })}
                </div> : <h3 style={{color: 'red', marginBottom: '0.5rem'}}>You have no {tasks_type} tasks</h3>}
            </>}
            {hasFooter && <HomepageKey/>}
            {logout && <div className='logout-container'><span style={{ marginTop: '1rem', textAlign: 'right', width: 'fit-content' }} className='logout_btn' title="Sign Out"  onClick={() => setLogoutDialog(true)}><i color='red' className="fa-solid fa-right-from-bracket fa-lg"></i>Sign out</span></div> }
          </main>
        </div>
      )
}

TemplatePage.defaultProps = {
    hasFooter: false
}

export default TemplatePage