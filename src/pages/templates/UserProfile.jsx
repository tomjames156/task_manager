import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"
import Loader from "../../components/items/Loader"
import Header from "../../components/sectioning/Header"
import AuthContext from "../../context/AuthContext"
import LogoutDialog from "../../components/dialogs/LogoutDialog"
import dayjs from "dayjs"

function UserProfile() {
    const {logoutDialog, setLogoutDialog} = useContext(AuthContext)
    const {profile, isLoading, getProfile} = useContext(ProfileContext)
    const [btnTitle, setBtnTitle] = useState('Copy Email')
    var localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)
    let date = new Date(profile.date_joined).toDateString()
    let dateJoined = dayjs(date).format('LL')

    const copyEmail = () => {
      navigator.clipboard.writeText(profile.email)
      setBtnTitle('Copied')
    }

    useEffect(() => {
        setLogoutDialog(false)
        getProfile()
    }, [])

  if(isLoading){
    return (
    <div className="container">
      <main>
        <Loader/>
      </main>
    </div>)
  }else{
    return(
        <div className="container">
            <Header/>
            {logoutDialog && <LogoutDialog />}
            <main className="profile" style={{filter: logoutDialog ? 'brightness(0.7)' : 'none', pointerEvents: logoutDialog ? 'none': 'auto'}} >
              <div className="profile-info-container">
                <img style={{width: '120px', height: '140px', borderRadius: 
              '1rem', objectFit: 'cover'}} src={profile?.profile_pic && profile.profile_pic.substring(20,)} alt={`${profile.username} profile pic`}/>
                <div className="info">
                  <p className="full_name" style={{fontWeight:"bold"}}>{profile.lastname} {profile.firstname}</p>
                  <p>@<span style={{fontWeight: 'bold', color: '#555'}}>{profile.username}</span></p>
                  <p className="email_address">{profile.email}<Link href={`mailto:${profile.email}`} title="Send Email"><i className="fa-regular fa-envelope fa-xs"></i></Link><span title={btnTitle} onClick={copyEmail} className="copy_address"><i className="fa-regular fa-clipboard fa-xs"></i></span></p>
                </div>
                <div className="friends">
                  <div><h1>{profile?.tasks && profile.tasks.length}</h1><p>tasks</p> </div>
                  <div><h1>10</h1><p>friends</p></div>
                </div>
              </div>              
              <p>{profile.bio}</p>
              <div className="location-joined">
                <small><i className="fa-solid fa-location-dot fa-xs"></i><span>{profile.location}</span></small>
                <small>Joined <span style={{fontWeight: 'bold'}}>{dateJoined}</span>.</small>
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
              <span style={{marginTop: '2rem'}} className='logout' title="Sign Out" onClick={() => {setLogoutDialog(true)}}><i color='red' className="fa-solid fa-right-from-bracket fa-md"></i> Sign Out</span>
            </main>
        </div>
    )
  }
}

export default UserProfile