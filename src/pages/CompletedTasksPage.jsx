import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import TemplatePage from './TemplatePage'

const CompletedTaskPage = () => {
  const {user, logoutUser, setMessage, authTokens} = useContext(AuthContext)
  const [tasks, setTasks] = useState([])

  const api = process.env.REACT_APP_API_LINK

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    let response = await fetch(`${api}/tasks/completed/`, {
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
  }


  return (
    <TemplatePage 
      user={user} 
      tasks={tasks} 
      page_title='Completed Tasks'
      hasFooter={false}
    />
  )
}

export default CompletedTaskPage