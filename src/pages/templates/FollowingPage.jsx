import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/AuthContext"
import UserItem from "../../components/items/UserItem"
import Header from "../../components/sectioning/Header"

function FollowingPage() {
    const [followingList, setFriendsList] = useState([])
    const {api, authTokens} = useContext(AuthContext)

    const getFriends = async () => {
        try{
            let response = await fetch(`${api}/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Access-Key ${authTokens?.access}`
                }
            })

            let data = await response.json()
            setFriendsList(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getFriends()
    }, [])

  return (
    <div className="container">
        <Header/>
        <main id="friends-followers">
            <h1>Friends</h1>
            <p>These are people that you follow. Click <Link to="/people/followers">here</Link> to see who follows you</p>
            {followingList && followingList.map((friend, index) => <UserItem key={index} user_obj={friend} />)}
        </main>
    </div>
  )
}

export default FollowingPage