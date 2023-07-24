import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)

  return (
    <nav>
        <h3 className='app-name'>Taskify</h3>
        <div className='options'>
          {user ? <span className='logout' title="Log Out"  onClick={logoutUser}><i className="fa-solid fa-right-from-bracket fa-xl"></i></span> : <Link to="/login"><i className="fa-solid fa-right-to-bracket fa-xl"></i></Link>}
        </div>
    </nav>
  )
}

export default Header