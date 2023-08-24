import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

function LogoutDialog() {
    const {logoutUser, setLogoutDialog} = useContext(AuthContext)

  return (
    <div className='delete-dialog dialog-shown'>
        <p>Are you sure you want to sign out?</p>
        <div>
            <button onClick={() => {setLogoutDialog(false)}} className="cancel">Cancel</button>
            <button onClick={logoutUser} className="delete-task">Logout</button>
        </div>
    </div>
  )
}

export default LogoutDialog