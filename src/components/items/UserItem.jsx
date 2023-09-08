import { Link } from "react-router-dom"

function UserItem({user_obj}) {
  const host = process.env.REACT_APP_BASE_URL

  return (
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
  )
}

export default UserItem