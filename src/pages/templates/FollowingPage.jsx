import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import UserItem from "../../components/items/UserItem"
import Header from "../../components/sectioning/Header"
import ProfileContext from "../../context/ProfileContext"

function FollowingPage() {
    const {following, getFollowing} = useContext(ProfileContext)

    useEffect(() => {
        getFollowing()
    }, [])

  return (
    <div className="container">
        <Header/>
        <main id="friends-followers">
            <h1>Friends</h1>
            <p>These are people that you follow. Click <Link to="/people/friends">here</Link> to see who follows you</p>
            {following && following.length > 1 && following.map((friend, index) => <UserItem key={index} user_obj={friend} />)}
        </main>
    </div>
  )
}

export default FollowingPage