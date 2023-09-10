import { motion } from "framer-motion"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"

function UserItem({user_obj}) {
  const host = process.env.REACT_APP_BASE_URL
  const {profile, startFriendship} = useContext(ProfileContext)
  const mover = useNavigate()

  let viewProfile = () => {
    mover(`/people/${user_obj.username}`)
  }

  return (
    <motion.span className="user-item"
      initial={{opacity: 0, y: -50}}
      animate={{opacity: 1, y: 0}}
    >
      <div title="View Profile" onClick={viewProfile} >
        <img src={`${host}/${user_obj.profile_pic}`} alt={`${user_obj.username}'s profile picture`} />
        <div>
          <div>
            <p className="fullname">{user_obj.lastname} {user_obj.firstname}</p>
            <p className="username">{user_obj.username}</p>
          </div>
        </div>
      </div>
      {profile.username !== user_obj.username && <button title="Follow" onClick={() => startFriendship(user_obj.username)}>Friend</button>}
    </motion.span>
  )
}

export default UserItem