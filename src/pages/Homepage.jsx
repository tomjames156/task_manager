import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import TasksContext from '../context/TasksContext'
import TemplatePage from './TemplatePage'

const Homepage = () => {
  const {user, logoutUser, setMessage, authTokens} = useContext(AuthContext)
  const {newTasks, getNewTasks} = useContext(TasksContext)
  const [tasks, setTasks] = useState([])

  const api = process.env.REACT_APP_API_LINK

  useEffect(() => {
    getTasks()
    getNewTasks()
  }, [])

  const getTasks = async () => {
    let response = await fetch(`${api}/tasks/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Access-Key ${authTokens?.access}`
      }
    })
    let data = await response.json()
    if(response.status === 200){
      setTasks(data)
    }else if(response.statusText === "Unauthorized"){
      setMessage('Your login session expired')
      logoutUser()
    }else{
      logoutUser()
    }
    // setIsLoading(false)
  }

  return(
    <TemplatePage 
      user={user} 
      tasks={tasks} 
      page_title='Taskify'
      hasFooter={true}
      new_tasks={newTasks}
    />
  )
}

export default Homepage