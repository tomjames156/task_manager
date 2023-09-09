import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function UserItem({user_obj}) {
  const host = process.env.REACT_APP_BASE_URL

  return (
    <motion.span 
      initial={{opacity: 0, y: -200}}
      animate={{opacity: 1, y: 0}}
    >
      <Link className="user-item" title="View Profile" to={`/people/${user_obj.username}`}>
        <img src={`${host}/${user_obj.profile_pic}`} alt={`${user_obj.username}'s profile picture`} />
        <div>
          <div>
            <p className="fullname">{user_obj.lastname} {user_obj.firstname}</p>
            <p className="username">{user_obj.username}</p>
          </div>
          <button>Friend</button>
        </div>
      </Link>
    </motion.span>
  )
}

export default UserItem