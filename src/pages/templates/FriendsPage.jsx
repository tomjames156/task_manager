import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"
import UserItem from "../../components/items/UserItem"
import Header from "../../components/sectioning/Header"

function FriendsPage() {
    const {friends, getFriends} = useContext(ProfileContext)

    useEffect(() => {
        getFriends()
    }, [])

  return (
    <div className="container">
        <Header/>
        <main id="friends-followers">
            <h1>Friends</h1>
            <p>These are people that follow you back. Click <Link to="/people/following">here</Link> to see who you're following</p>
            {friends && friends.length > 1 && friends.map((friend, index) => <UserItem key={index} user_obj={friend} />)}
        </main>
    </div>
  )
}

export default FriendsPage