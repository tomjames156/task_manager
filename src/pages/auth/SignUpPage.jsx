import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

const Login = () => {
  const {signUpUser, message, setMessage} = useContext(AuthContext)
  const [inputs, setInputs] = useState({})
  const [validateMsg, setValidateMsg]= useState('')

  const eyeSlash = useRef()
  const noSlash = useRef()
  const eyeSlash1 = useRef()
  const noSlash1 = useRef()
  let emailRef = useRef()
  let firstNameRef = useRef()
  let lastNameRef = useRef()
  let userNameRef = useRef()
  let password1Ref = useRef()
  let password2Ref = useRef()

  const showPassword = () => {
    eyeSlash.current.style.display = ''
    noSlash.current.style.display = 'none'
    password1Ref.current.type = 'text'
  }

  const hidePassword = () => {
    eyeSlash.current.style.display = 'none'
    noSlash.current.style.display = ''
    password1Ref.current.type = 'password'
  }

  const showPassword2 = () => {
    eyeSlash1.current.style.display = ''
    noSlash1.current.style.display = 'none'
    password2Ref.current.type = 'text'
  }

  const hidePassword2 = () => {
    eyeSlash1.current.style.display = 'none'
    noSlash1.current.style.display = ''
    password2Ref.current.type = 'password'
  }

  const closeAlert = (e) => {
    setMessage('')
    setValidateMsg('')
  }

  const resetValidationStyling = () => {
    setMessage('')
    emailRef.current.classList = ''
    password1Ref.current.classList = ''
    password2Ref.current.classList = ''
    firstNameRef.current.classList = ''
    lastNameRef.current.classList = ''
    userNameRef.current.classList = ''
  }

  const validateInputs = (e) => {
    e.preventDefault()
    resetValidationStyling()
    if(inputs.firstname === ''){
      setValidateMsg('Please enter your first name')
      firstNameRef.current.classList.add('vldtn-err')
    }else if(inputs.lastname === ''){
      setValidateMsg('Please enter your last name')
      lastNameRef.current.classList.add('vldtn-err')
    }else if(inputs.username === ''){
      setValidateMsg("Please enter your username")
      userNameRef.current.classList.add('vldtn-err')
    }else if(!emailRef.current.checkValidity()){
      setValidateMsg('Please enter a valid email')
      emailRef.current.classList.add('vldtn-err')
    }else if(emailRef.current.value === ''){
      setValidateMsg('Please enter your email address')
      emailRef.current.classList.add('vldtn-err')
    }else if(password1Ref.current.value === ''){
      setValidateMsg("Please enter a password")
      password1Ref.current.classList.add('vldtn-err')
    }else if(password1Ref.current.value.length < 8){
      setValidateMsg('Password too short (8 or more characters required)')
      password1Ref.current.classList.add('vldtn-err')
    }else if(password2Ref.current.value === ''){
      setValidateMsg('Please confirm your password')
      password2Ref.current.classList.add('vldtn-err')
    }else if(password1Ref.current.value !== password2Ref.current.value){
      setValidateMsg('Passwords do not match')
      password1Ref.current.classList.add('vldtn-err')
      password2Ref.current.classList.add('vldtn-err')
    }else if(password1Ref.current && inputs.username && password2Ref.current && inputs.email && inputs.firstname && inputs.lastname && emailRef.current.checkValidity()){
      setValidateMsg('')
      signUpUser(inputs)
    }
  }

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    setMessage('')
  }, [])

  return (
    <div className='login-form'>
      <main>
        <h1>Sign Up</h1>
        {message && <div className={`error ${message === 'Logged out successfully' ? 'success': ''}`}><span>{message}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        {validateMsg && <div className='error'><span>{validateMsg}</span><i className="fa-solid fa-circle-xmark" onClick={closeAlert}></i></div>}
        <form noValidate onSubmit={validateInputs} autoComplete='off'>
            <div>
              <label htmlFor="firstname">First name:</label>
              <input ref={firstNameRef} type="text" name='firstname' onChange={handleChange} value={inputs.firstname || ''} />
            </div>
            <div>
              <label htmlFor="lastname">Last name:</label>
              <input ref={lastNameRef} type="text" name='lastname' onChange={handleChange} value={inputs.lastname || ''} />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input ref={userNameRef} value={inputs.username || ''} onChange={handleChange} type="text" name="username" id='username' />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input ref={emailRef} type="email" value={inputs.email || ''} onChange={handleChange} name='email' id='email' />
            </div>
            <div className='pass-container'>
              <label htmlFor="password1">Set Password:</label>
              <input value={inputs.password1 || ''} onChange={handleChange} type="password" name="password1" ref={password1Ref} id="password1"/>{inputs.password1 && <><i class="fa-solid fa-eye eyes" ref={noSlash} onClick={showPassword}></i><i ref={eyeSlash} class="fa-solid fa-eye-slash eyes" style={{display: 'none'}} onClick={hidePassword}></i></>}
            </div>
            <div className='pass-container'>
              <label htmlFor="password1">Repeat Password:</label>
              <input ref={password2Ref} value={inputs.password2 || ''} onChange={handleChange} type="password" name="password2" id="password2"/>{inputs.password2 && <><i class="fa-solid fa-eye eyes" ref={noSlash1} onClick={showPassword2}></i><i ref={eyeSlash1} style={{display: 'none'}} class="fa-solid fa-eye-slash eyes" onClick={hidePassword2}></i></>}
            </div>
            <span><button type="submit" title='Submit'>Submit</button></span>
          </form>
          <p>Already have an Account?<Link to='/login'> Log in</Link></p>
      </main>
    </div>
  )
}

export default Login