import Header from "../../components/sectioning/Header"
import Loader from "../../components/items/Loader"
import { useEffect, useState } from "react"
import UserItem from "../../components/items/UserItem"

function SearchUsers() {
    const [searchInput, setSearchInput] = useState('')
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const api = process.env.REACT_APP_API_LINK

    const getAllUsers = async () => {
        setIsLoading(true)
        let response = await fetch(`${api}/users`)
        let data = await response.json()
        // console.log(data)
        setUsers(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getAllUsers()
    }, [])

  return (
    <div className="container">
        <Header/>
        <main>
            {isLoading ? <Loader/> : 
            <div>
                <form action="" className="search-form">
                    <input type="text" onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" value={searchInput || '' }/>
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                {users.length > 0 ? users.map((user) => <UserItem key={user.id} user_obj={user} />) : 'Content' }
            </div>}
        </main>
    </div>
  )
}

export default SearchUsers