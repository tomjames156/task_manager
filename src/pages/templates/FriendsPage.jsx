import { useState, useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"
import UserItem from "../../components/items/UserItem"
import Header from "../../components/sectioning/Header"

function FriendsPage() {
    const [friendsList, setFriendsList] = useState([])
    const {api, authTokens} = useContext(AuthContext)

    const getFriends = async () => {
        try{
            let response = await fetch(`${api}/friends`, {
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
        <main>
            <h1>Friends</h1>
            <p>These are people that follow you. Click here to see who  you're following</p>
            {friendsList && friendsList.map((friend, index) => <UserItem key={index} user_obj={friend} />)}
        </main>
    </div>
  )
}

export default FriendsPage