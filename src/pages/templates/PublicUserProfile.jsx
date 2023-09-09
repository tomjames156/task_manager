import dayjs from 'dayjs'
import Header from '../../components/sectioning/Header'
import Loader from '../../components/items/Loader'
import ProfileContext from '../../context/ProfileContext'
import { useContext, useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

function PublicUserProfile() {
  const { host, publicProfile, getPublicProfile, isLoading } = useContext(ProfileContext)
  const { username } = useParams()
  const [btnTitle, setBtnTitle] = useState('Copy Email')
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)

  let getFormattedDate = (dateVal) => {
    let date = new Date(dateVal).toDateString()
    return dayjs(date).format('LL')
  }

  // if user does not exist then just display user does not exist or move to 404 page

  const copyEmail = () => {
    navigator.clipboard.writeText(publicProfile.email)
    setBtnTitle('Copied')
  }

  useEffect(() => {
    getPublicProfile(username)
  }, [])

  return (
    <div className='container'>
      <Header/>
      <main>
      {isLoading ? <Loader/> :
        <>
        <div className="profile-info-container">
            <img style={{width: '140px', height: '140px', borderRadius: 
            '1rem', objectFit: 'cover'}} src={publicProfile?.profile_pic && `${host}${publicProfile.profile_pic}`} alt={`${publicProfile.username}'s profile pic`}/>
            <div className="info">
              <p className="full_name" style={{fontWeight:"bold"}}>{publicProfile.lastname} {publicProfile.firstname}</p>
              <p>@<span style={{fontWeight: 'bold', color: '#555'}}>{publicProfile.username}</span></p>
              <p className="email_address">{publicProfile.email}<a href={`mailto:${publicProfile.email}`} title="Send Email"><i className="fa-regular fa-envelope fa-xs"></i></a><span title={btnTitle} onClick={copyEmail} className="copy_address"><i className="fa-regular fa-clipboard fa-xs"></i></span></p>
            </div>
        </div>              
        <p className="bio">{publicProfile.bio}</p>
        <div className="location-joined">
            <small><i className="fa-solid fa-location-dot fa-xs"></i><span>{publicProfile.location}</span></small>
            <small>Joined <span style={{fontWeight: 'bold'}}>{getFormattedDate(publicProfile?.date_joined)}</span>.</small>
        </div>
        </>}
      </main>
    </div>
  )
}

export default PublicUserProfile