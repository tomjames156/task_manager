import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"
import ProfileUpdateForm from "./ProfileUpdateForm"
import Loader from "../../components/items/Loader"
import Header from "../../components/sectioning/Header"
import AuthContext from "../../context/AuthContext"
import UserProfile from "./UserProfile.jsx"
import LogoutDialog from "../../components/dialogs/LogoutDialog"


function ProfileTemplate() {
    const {logoutDialog, setLogoutDialog} = useContext(AuthContext)
    const {profile, isLoading, getProfile} = useContext(ProfileContext)

    let location = useLocation()
    

    useEffect(() => {
        setLogoutDialog(false)
        getProfile()
    }, [])

  return(
      <div className="container">
          <Header/>
          {logoutDialog && <LogoutDialog />}
          <main className="profile" style={{filter: logoutDialog ? 'brightness(0.7)' : 'none', pointerEvents: logoutDialog ? 'none': 'auto'}} >
          {isLoading ? <Loader/> :
          <>
            {location.pathname === '/profile' && <UserProfile profile={profile}/>}
            {location.pathname === '/profile/update' && <ProfileUpdateForm profile={profile}/>}
          </>
          }
          </main>
      </div>
  )
}


export default ProfileTemplate