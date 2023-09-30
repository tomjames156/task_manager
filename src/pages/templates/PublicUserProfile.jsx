import dayjs from 'dayjs'
import Header from '../../components/sectioning/Header'
import Loader from '../../components/items/Loader'
import loading from '../../assets/loading.svg'
import ProfileContext from '../../context/ProfileContext'
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import { useParams } from 'react-router-dom'

function PublicUserProfile() {
  const { host, profile, publicProfile, getPublicProfile, isLoading, startFriendship } = useContext(ProfileContext)
  const { username } = useParams()
  const [btnTitle, setBtnTitle] = useState('Copy Email')
  const [initiating, setInitiating] = useState(false)
  var localizedFormat = require('dayjs/plugin/localizedFormat')
  dayjs.extend(localizedFormat)
  const mover = useNavigate()

  let getFormattedDate = (dateVal) => {
    let date = new Date(dateVal).toDateString()
    return dayjs(date).format('LL')
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(publicProfile.email)
    setBtnTitle('Copied')
  }

  const follow = () => {
    setInitiating(true)
    startFriendship(publicProfile.username)
    setInitiating(false)
  }

  useEffect(() => {
    getPublicProfile(username)
  }, [])

  return (
    <div className='container'>
      <Header/>
      <motion.main
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
      {isLoading ? <Loader/> :
        <>
        <h1 style={{marginBottom: '1rem'}}><Link title="Back" onClick={()=> mover(-1)}><i className="fa-solid fa-angle-left"></i></Link></h1>
        <div className="profile-info-container public">
            <img style={{width: '140px', height: '140px', borderRadius: 
            '1rem', objectFit: 'cover'}} src={publicProfile?.profile_pic && `${host}${publicProfile.profile_pic}`} alt={publicProfile.username ?`${publicProfile.username}'s profile pic`: ''}/>
            <div className="info">
              <p className="full_name" style={{fontWeight:"bold"}}>{publicProfile.lastname} {publicProfile.firstname}</p>
              <p>@<span style={{fontWeight: 'bold', color: '#555'}}>{publicProfile.username}</span></p>
              <p className="email_address">{publicProfile.email}<a href={`mailto:${publicProfile.email}`} title="Send Email"><i className="fa-regular fa-envelope fa-xs"></i></a><span title={btnTitle} onClick={copyEmail} className="copy_address"><i className="fa-regular fa-clipboard fa-xs"></i></span></p>
            </div>
            {profile?.username !== publicProfile.username &&
            <div className="friends">
              {initiating ? 
              <button className='btn-loading'>
                <img src={loading} alt="loading" />
              </button> : 
              publicProfile?.is_followed ?                 
              publicProfile?.friends ? 
              <button className='friends' title="Friends">Friends</button> : 
              <button className='followed' title="Followed">Followed</button>:
              <button title="Follow" onClick={follow}>Follow</button>
              }
            </div>}
        </div>              
        <p className="bio">{publicProfile.bio}</p>
        <div className="location-joined">
            <small><i className="fa-solid fa-location-dot fa-xs"></i><span>{publicProfile.location}</span></small>
            <small>Joined <span style={{fontWeight: 'bold'}}>{getFormattedDate(publicProfile?.date_joined)}</span>.</small>
        </div>
        </>}
      </motion.main>
    </div>
  )
}

export default PublicUserProfile