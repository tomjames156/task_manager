import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)

  return (
    <nav>
        <h3 className='app-name'>Taskify</h3>
        <div className='options'>
          <Link to="/"><i title='All Tasks' class="fa-solid fa-house fa-lg"></i></Link>
          <Link to="/incomplete"><i title="Incomplete Tasks" class="fa-solid fa-circle-xmark fa-lg"></i></Link>
          <Link to="/"><i title="New Tasks" className="fa-solid fa-circle-plus fa-lg"></i></Link>
          <Link to="/urgent"><i class="fa-solid fa-circle-exclamation fa-lg"></i></Link>
          <Link to="/completed"><i title="Completed Tasks" className="fa-solid fa-circle-check fa-lg"></i></Link>
          {user ? <span className='logout' title="Sign Out"  onClick={logoutUser}><i className="fa-solid fa-right-from-bracket fa-xl"></i></span> : <Link to="/login"><i className="fa-solid fa-right-to-bracket fa-xl"></i></Link>}
        </div>
    </nav>
  )
}

export default Header