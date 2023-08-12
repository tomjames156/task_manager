import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { FaEyeSlash, FaEye } from 'react-icons/fa'

const Login = () => {
  const {loginUser, message, setMessage} = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [validateMsg, setValidateMsg]= useState('')

  const eyeSlash = document.getElementById('slash')
  const no_slash = document.getElementById('no_slash')
  let passwordInput = document.getElementById('password')

  const showPassword = () => {
    eyeSlash.style.display = ''
    no_slash.style.display = 'none'
    passwordInput.type = 'text'
  }

  const hidePassword = () => {
    eyeSlash.style.display = 'none'
    no_slash.style.display = ''
    passwordInput.type = 'password'
  }

  const closeAlert = (e) => {
    setMessage('')
    setValidateMsg('')
  }

  const validateInputs = (e) => {
    e.preventDefault()
    if(username === ''){
      setValidateMsg("Please enter your username")
    }else if(password === ''){
      setValidateMsg("Please enter your password")
    }else if(password && username){
      loginUser(e)
    }
  }

  return (
    <div className='login-form'>
      <main>
        <h1>Sign In</h1>
        {message && <div className='error'><span>{message.detail}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        {validateMsg && <div className='error'><span>{validateMsg}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        <form onSubmit={validateInputs}>
            <div><input value={username || ''} onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" id='username' placeholder='Enter Username' /></div>
            <div className='pass-container'><input value={password || ''} onChange={(e) => {
              setPassword(e.target.value)}} type="password" name="password" id="password" placeholder='Enter Password' />{password && <><FaEye size='1.2rem' className='icon' id='no_slash' onClick={showPassword}/><FaEyeSlash style={{display: 'none'}} size='1.2rem' className='icon' id='slash' onClick={hidePassword}/></>}
            </div>
            <span><button type="submit" title='Submit'>Submit</button></span>
          </form>
      </main>
    </div>
  )
}

export default Login