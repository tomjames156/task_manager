import React, { useContext, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  const {loginUser, message, setMessage} = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [validateMsg, setValidateMsg]= useState('')

  const eyeSlash = useRef()
  const noSlash = useRef()
  let passwordInput = useRef()

  const showPassword = () => {
    eyeSlash.current.style.display = ''
    noSlash.current.style.display = 'none'
    passwordInput.current.type = 'text'
  }

  const hidePassword = () => {
    eyeSlash.current.style.display = 'none'
    noSlash.current.style.display = ''
    passwordInput.current.type = 'password'
  }

  const closeAlert = (e) => {
    setMessage('')
    setValidateMsg('')
  }

  const validateInputs = (e) => {
    e.preventDefault()
    if(username === ''){
      setMessage('')
      setValidateMsg("Please enter your username")
    }else if(password === ''){
      setMessage('')
      setValidateMsg("Please enter your password")
    }else if(password && username){
      setValidateMsg('')
      loginUser(e)
    }
  }

  return (
    <div className='login-form'>
      <main>
        <h1>Sign In</h1>
        {message && <div className={`error ${message === 'Logged out successfully' ? 'success': ''}`}><span>{message}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        {validateMsg && <div className='error'><span>{validateMsg}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        <form onSubmit={validateInputs} autoComplete='off'>
            <div><input value={username || ''} onChange={(e) => {setUsername(e.target.value)}} type="text" name="username" id='username' placeholder='Enter Username' /></div>
            <div className='pass-container'><input ref={passwordInput} value={password || ''} onChange={(e) => {
              setPassword(e.target.value)}} type="password" name="password" id="password" placeholder='Enter Password' />{password && <><i className="fa-solid fa-eye eyes" ref={noSlash} onClick={showPassword}></i><i ref={eyeSlash} className="fa-solid fa-eye-slash eyes" style={{display: 'none'}} onClick={hidePassword}></i></>}
            </div>
            <span><button type="submit" title='Submit'>Submit</button></span>
          </form>
          <p>Don't have an Account?<Link to='/signup'> Sign up</Link></p>
      </main>
    </div>
  )
}

export default Login