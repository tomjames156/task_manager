import {useContext, useState, useRef} from 'react'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import LinkBtn from '../items/LinkBtn'
import MenuLink from '../items/MenuLink'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const mobileNavRef = useRef()

  document.addEventListener('click', (e) => {
    if(!(e.target.parentElement === mobileNavRef.current) && !(e.target === mobileNavRef.current)){
      setShowMenu(false)
    }else{
      setShowMenu(true)
    }
  })

  return (
    <nav>
        <Link to='/' className='app-name'>Taskify</Link>
        <div className='options'>
          <div>
            <LinkBtn path='/' btn_name='All Tasks' icon_name='fa-house' />

            <LinkBtn path='/new' btn_name='New Tasks' icon_name='fa-stopwatch' size='xl' />

            <LinkBtn path="/task/new" btn_name='Add New Task' icon_name='fa-circle-plus' />

            <LinkBtn path='/people/search' btn_name='Find Friends' icon_name='fa-users' />

            <LinkBtn path='/completed' btn_name='Completed Tasks' icon_name='fa-circle-check' />

            <LinkBtn path="/urgency" btn_name='Urgency View' icon_name="fa-triangle-exclamation" />

            <LinkBtn path="/incomplete" btn_name='Incomplete Tasks' icon_name='fa-circle-xmark' />
          </div>
          <div>
            <LinkBtn path="/profile" btn_name='My Profile' icon_name='fa-user' />
          </div>
          <div id='mobile_nav' ref={mobileNavRef} onClick={() => {setShowMenu(true)}}>
            <i className="fa-solid fa-bars fa-xl"></i>
          </div>
        </div>
        <div className={`mobile_options${showMenu ? ' show' : ''}`}>
          <MenuLink path='/' btn_name='All Tasks' icon_name='fa-house' page='Home'></MenuLink>

          <MenuLink path='/new' btn_name='New Tasks' size='lg' icon_name='fa-stopwatch' page='Recent' />

          <MenuLink path="/task/new" btn_name='Add New Task' icon_name='fa-circle-plus' page='Create' />
          
          <MenuLink path='/completed' btn_name='Completed Tasks' icon_name='fa-circle-check' page='Completed' />

          <MenuLink path="/urgency" btn_name='Urgency View' icon_name="fa-triangle-exclamation" page='Urgency' />

          <MenuLink path="/incomplete" btn_name='Incomplete Tasks' icon_name='fa-circle-xmark' page='Incomplete' />

          <MenuLink path='/profile' btn_name='My Profile' icon_name='fa-user' page='Profile' />          
        </div>
    </nav>
  )
}

export default Header