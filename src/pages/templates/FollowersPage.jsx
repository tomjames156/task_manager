import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/sectioning/Header"
import UserItem from "../../components/items/UserItem"
import ProfileContext from "../../context/ProfileContext"

function FollowersPage() {
    const {followers, getFollowers} = useContext(ProfileContext)

    useEffect(() => {
        getFollowers()
    }, [])

    return (
        <div className="container">
            <Header/>
            <main id="friends-followers">
                <h1>Followers</h1>
                <p>These are people that followed you. Click <Link to="/people/following">here</Link> to see who you're following</p>
                {followers && followers.length > 0 && followers.map((follower, index) => <UserItem key={index} user_obj={follower} />)}
            </main>
        </div>
      )
}

export default FollowersPage