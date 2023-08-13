import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import LinkBtn from './LinkBtn'

const Header = () => {
  const {user, logoutUser} = useContext(AuthContext)

  return (
    <nav>
        <h3 className='app-name'>Taskify</h3>
        <div className='options'>
          <div>
            <LinkBtn path='/' btn_name='All Tasks' icon_name='fa-house' />

            <LinkBtn path="/incomplete" btn_name='Incomplete Tasks' icon_name='fa-circle-xmark' />

            <LinkBtn path='/new' btn_name='New Tasks' icon_name='fa-circle-plus' />

            <LinkBtn path="/urgent" btn_name='Urgency View' icon_name="fa-circle-exclamation" />

            <LinkBtn path='/completed' btn_name='Completed Tasks' icon_name='fa-circle-check' />
          </div>

          <div>
            {user ? <span className='logout' title="Sign Out"  onClick={logoutUser}><i color='red' className="fa-solid fa-right-from-bracket fa-lg"></i></span> : <Link to="/login"><i color='red' className="fa-solid fa-right-to-bracket fa-lg"></i></Link>}
          </div>
        </div>
    </nav>
  )
}

export default Header