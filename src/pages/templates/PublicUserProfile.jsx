import dayjs from 'dayjs'
import Header from '../../components/sectioning/Header'
import ProfileContext from '../../context/ProfileContext'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function PublicUserProfile() {
  const { host, api } = useContext(ProfileContext)
  const { username } = useParams()
  const [btnTitle, setBtnTitle] = useState('Copy Email')
  const [profile, setProfile] = useState({})
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)

  let getFormattedDate = (dateVal) => {
    let date = new Date(dateVal).toDateString()
    return dayjs(date).format('LL')
  }

  const fetchUserProfile = async () => {
    console.log(`${api}/public_profile/${username}`)
    try{
      let response = await fetch(`${api}/public_profile/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let data = await response.json()
      setProfile(data)
    }catch(err){
      console.log(err)
    }
  }

  // if user does not exist then just display user does not exist or move to 404 page

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setBtnTitle('Copied')
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <div className='container'>
      <Header/>
      <main>
        <div className="profile-info-container">
            <img style={{width: '140px', height: '140px', borderRadius: 
            '1rem', objectFit: 'cover'}} src={profile?.profile_pic && `${host}${profile.profile_pic}`} alt={`${profile.username}'s profile pic`}/>
            <div className="info">
              <p className="full_name" style={{fontWeight:"bold"}}>{profile.lastname} {profile.firstname}</p>
              <p>@<span style={{fontWeight: 'bold', color: '#555'}}>{profile.username}</span></p>
              <p className="email_address">{profile.email}<a href={`mailto:${profile.email}`} title="Send Email"><i className="fa-regular fa-envelope fa-xs"></i></a><span title={btnTitle} onClick={copyEmail} className="copy_address"><i className="fa-regular fa-clipboard fa-xs"></i></span></p>
            </div>
        </div>              
        <p className="bio">{profile.bio}</p>
        <div className="location-joined">
            <small><i className="fa-solid fa-location-dot fa-xs"></i><span>{profile.location}</span></small>
            <small>Joined <span style={{fontWeight: 'bold'}}>{getFormattedDate(profile?.date_joined)}</span>.</small>
        </div>
      </main>
    </div>
  )
}

export default PublicUserProfile