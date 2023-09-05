import Header from "../../components/sectioning/Header"
import Loader from "../../components/items/Loader"
import { useState, useRef } from "react"
import UserItem from "../../components/items/UserItem"

function SearchUsers() {
    const searchQueryRef = useRef()
    const [users, setUsers] = useState([])
    const [searchMessage, setSearchMessage] = useState('Find your friends on Taskify 🔍')
    const [isLoading, setIsLoading] = useState(false)
    const api = process.env.REACT_APP_API_LINK
    const submitRef = useRef()

    const searchUsers = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try{
            if(searchQueryRef.current.value !== ''){
                let response = await fetch(`${api}/users/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "query": searchQueryRef.current.value
                    })
                })
                let data = await response.json()
                setUsers(data)
                setSearchMessage('No friends found 🥲')
            }
        }catch(err){
            console.log(err)
        }

        if(searchQueryRef.current.value === ''){
            setUsers([])
            setSearchMessage("Find your friends on Taskify 🔍")
        }
        setIsLoading(false)
    }

    const handleChange = (e) => {
        submitRef.current.click()
    }

  return (
    <div className="container">
        <Header/>
        <main>
            <div>
                <form autoComplete="off" onSubmit={searchUsers} className="search-form">
                    <input autoFocus type="text" name="query" onChange={handleChange} placeholder="Search" ref={searchQueryRef}/>
                    <button ref={submitRef} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                {isLoading  ? <Loader/> : users.length > 0 ? users.map((user, index) => <UserItem key={index} user_obj={user} />) : searchMessage }
                
            </div>
        </main>
    </div>
  )
}

export default SearchUsers