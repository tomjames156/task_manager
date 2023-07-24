import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import ListItem from '../components/ListItem'

const Homepage = () => {
  const {user, logoutUser, setMessage, authTokens} = useContext(AuthContext)
  const [notes, setNotes] = useState([])

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
    }else if(response.statusText === "Unauthorized"){
      setMessage('Your login session expired')
      logoutUser()
    }else{
      logoutUser()
    }
    
  }


  return (
    <div className='container'>
      <Header></Header>
      <main>
        <h1 className='tasks-header'>Tasks</h1>
        {user && <p className='welcome-text'>Hi there 👋🏾, <strong>{user.username}</strong>. Here are your tasks for the day. Goodluck👍🏾</p>}
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