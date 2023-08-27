import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import AuthContext from "../../context/AuthContext"
import ProfileContext from "../../context/ProfileContext"

function UserProfile({profile}) {
  const {setLogoutDialog} = useContext(AuthContext)
  const {closeAllDialogs} = useContext(ProfileContext)
  const [btnTitle, setBtnTitle] = useState('Copy Email')
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)
  let date = new Date(profile.date_joined).toDateString()
  let dateJoined = dayjs(date).format('LL')
  let mover = useNavigate()

  useEffect(() => {
    closeAllDialogs()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setBtnTitle('Copied')
  }


  return (
    <>
    <div className="profile-info-container">
    <img style={{width: '140px', height: '140px', borderRadius: 
    '1rem', objectFit: 'cover'}} src={profile?.profile_pic ? profile.profile_pic.substring(20,) : '/profile_pics/no_pfp.jpeg'} alt={`${profile.username}'s profile pic`}/>
    <div className="info">
    <p className="full_name" style={{fontWeight:"bold"}}>{profile.lastname} {profile.firstname}</p>
    <p>@<span style={{fontWeight: 'bold', color: '#555'}}>{profile.username}</span></p>
    <p className="email_address">{profile.email}<a href={`mailto:${profile.email}`} title="Send Email"><i className="fa-regular fa-envelope fa-xs"></i></a><span title={btnTitle} onClick={copyEmail} className="copy_address"><i className="fa-regular fa-clipboard fa-xs"></i></span></p>
    </div>
    <div className="friends">
    <div><h1>{profile?.tasks && profile.tasks.length}</h1><p>tasks</p> </div>
    <div><h1>10</h1><p>friends</p></div>
    </div>
    </div>              
    <p className="bio">{profile.bio}</p>
    <div className="location-joined">
        <small><i className="fa-solid fa-location-dot fa-xs"></i><span>{profile.location}</span></small>
        <small>Joined <span style={{fontWeight: 'bold'}}>{dateJoined}</span>.</small>
    </div>
    <button className="edit-profile-btn" onClick={() => mover('/profile/update')}>Edit Profile</button>
    <span style={{marginTop: '2rem', width: 'fit-content'}} className='logout' title="Sign Out" onClick={() => {setLogoutDialog(true)}}><i color='red' className="fa-solid fa-right-from-bracket fa-md"></i> Sign Out</span>
    </>
  )
}

export default UserProfile