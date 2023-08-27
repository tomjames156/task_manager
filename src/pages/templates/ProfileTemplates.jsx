import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"
import ProfileUpdateForm from "./ProfileUpdateForm"
import Loader from "../../components/items/Loader"
import Header from "../../components/sectioning/Header"
import AuthContext from "../../context/AuthContext"
import UserProfile from "./UserProfile.jsx"
import DeleteAccountDialog from "../../components/dialogs/DeleteAccountDialog"
import ConfirmationDialog from "../../components/dialogs/ConfirmationDialog"
import LogoutDialog from "../../components/dialogs/LogoutDialog"


function ProfileTemplate() {
    const {logoutDialog, setLogoutDialog} = useContext(AuthContext)
    const {profile, isLoading, getProfile, accountDialog, confirmDialog, closeAllDialogs} = useContext(ProfileContext)

    let location = useLocation()
    

    useEffect(() => {
      closeAllDialogs()
      setLogoutDialog(false)
      getProfile()
    }, [])

  return(
      <div className="container">
          <Header/>
          {logoutDialog && <LogoutDialog />}
          {accountDialog && <DeleteAccountDialog/>}
          {confirmDialog && <ConfirmationDialog/>}
          <main className="profile" style={{filter: logoutDialog || accountDialog ? 'brightness(0.7)' : 'none', pointerEvents: logoutDialog || accountDialog ? 'none': 'auto'}}>
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