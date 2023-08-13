import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import TasksContext from '../context/TasksContext'
import TemplatePage from './TemplatePage'

const Homepage = () => {
  const {user, logoutUser, setMessage, authTokens} = useContext(AuthContext)
  const {newTasks, isLoading, setIsLoading} = useContext(TasksContext)
  const [tasks, setTasks] = useState([])

  const api = process.env.REACT_APP_API_LINK

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    console.log(isLoading)
    setIsLoading(true)
    console.log(isLoading)
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
      setIsLoading(false)
    }else if(response.statusText === "Unauthorized"){
      setMessage('Your login session expired')
      logoutUser()
      setIsLoading(false)
    }else{
      logoutUser()
      setIsLoading(false)
    }
  }

  return(
    <TemplatePage 
      user={user} 
      tasks_type='' 
      page_title='Taskify'
      hasFooter={true}
      section_text={newTasks.length > 0 ? `You have ${newTasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`}
    />
  )
}

// newTasks.length > 0 ? `You have ${newTasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`

export default Homepage