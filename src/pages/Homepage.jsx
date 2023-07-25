import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import ListItem from '../components/ListItem'
// import countNewTasks from '../utils/CountNewTasks'

const Homepage = () => {
  const {user, logoutUser, setMessage, authTokens} = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [newTasks, setNewTasks] = useState([])

  const api = process.env.REACT_APP_API_LINK


  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    let response = await fetch(`${api}/notes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Access-Key ${authTokens?.access}`
      }
    })
    let data = await response.json()
    if(response.status === 200){
      setNotes(data)
      getNewTasks(data)
    }else if(response.statusText === "Unauthorized"){
      setMessage('Your login session expired')
      logoutUser()
    }else{
      logoutUser()
    }
    
  }


  const getNewTasks = (arr) => {
    let allNewTasks = []
    for(let i = 0; i < arr.length; i++){
      if(arr[i].is_new){
        allNewTasks.push(arr[i])
      }
    }

    setNewTasks(allNewTasks)
  }


  return (
    <div className='container'>
      <Header></Header>
      <main>
        <h1 className='tasks-header'>Tasks</h1>
        {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. {newTasks.length > 0 ? `You have ${newTasks.length} new task(s) for the day Goodluck👍🏾` : `You've successfully completed all of your assigned tasks. Have a great day👍🏾`}.</p>}
        {notes && 
        <div className='tasks'>
          {notes.map((note) => {
              return <ListItem key={note.id} note_obj={note}></ListItem>
            })}
        </div>}
        <div className='key'>
        <div>
          <i className="fa-solid fa-circle-plus"></i>
          <span>- New</span>
        </div>
        <div>
          <i className="fa-solid fa-circle-check"></i>
          <span>- Completed</span>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Homepage