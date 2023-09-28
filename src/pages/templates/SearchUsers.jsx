import Header from "../../components/sectioning/Header"
import Loader from "../../components/items/Loader"
import ProfileContext from "../../context/ProfileContext"
import { useState, useRef, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserItem from "../../components/items/UserItem"
import AuthContext from "../../context/AuthContext"

function SearchUsers() {
    const mover = useNavigate()
    const searchQueryRef = useRef()
    const [users, setUsers] = useState([])
    const [searchMessage, setSearchMessage] = useState('Find your friends on Taskify 🔍')
    const {isLoading, searchQuery, clearSearchQuery, startLoading, stopLoading, updateSearchQuery} = useContext(ProfileContext)
    const {authTokens} = useContext(AuthContext)
    const api = process.env.REACT_APP_API_LINK
    const submitRef = useRef()

    const searchUsers = async (e) => {
        e.preventDefault()
        startLoading()
        if(searchQueryRef.current.value !== ''){
            try{
                let response = await fetch(`${api}/users/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Access-Key ${authTokens?.access}`
                    },
                    body: JSON.stringify({
                        "query": searchQueryRef.current.value
                    })
                })
                let data = await response.json()
                setUsers(data)
                updateSearchQuery(searchQueryRef.current.value)
                setSearchMessage('No friends found 🥲')
            }catch(err){
                console.log(err)
            }
        }else if(searchQueryRef.current.value === ''){
            setUsers([])
            clearSearchQuery()
            setSearchMessage("Find your friends on Taskify 🔍")
        }
        stopLoading()
    }

    const handleChange = (e) => {
        submitRef.current.click()
    }

    useEffect(() => {
        searchQueryRef.current.value = searchQuery
        handleChange()
    }, [])

  return (
    <div className="container">
        <Header/>
        <main id="find-friends">
            <div>
                <form autoComplete="off" onSubmit={searchUsers} className="search-form">
                    <input autoFocus type="text" name="query" onChange={handleChange} placeholder="Search" ref={searchQueryRef}/>
                    <button ref={submitRef} type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                {isLoading  ? <Loader/> : users.length > 0 ? users.map((user, index) => <UserItem key={index} user_obj={user} />) : searchMessage }
            </div>
            {users.length < 1 && <div onClick={() => {mover('/people/followers')}} style={{fontWeight: 'bold', marginTop: '2rem'}}><i className="fa-solid fa-users-viewfinder"></i>Follow requests</div>}
        </main>
    </div>
  )
}

export default SearchUsers