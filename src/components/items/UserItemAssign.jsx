import { useState, useContext } from "react"
import TaskContext from "../../context/TaskContext"
import PropTypes from 'prop-types'

function UserItemAssign({user_obj, checked}) {
    const [assigned, setAssigned] = useState(false)
    const { addAssignee } = useContext(TaskContext)
    const host = process.env.REACT_APP_BASE_URL

    const assign = () => {
        setAssigned(prevState => !prevState)
        if(!assigned){
            console.log('Yeahhh')
            addAssignee(user_obj.username)
        }else{
            console.log('Nahh')
        }
    }

    return (
        <div className="user-item assign" onClick={assign}>
            <div title={`Assign to ${user_obj.username}`}>
                <img src={`${host}/${user_obj.profile_pic}`} alt={`${user_obj.username}'s profile`} />
                <div>
                    <div>
                        <p className="fullname">{user_obj.lastname} {user_obj.firstname}</p>
                        <p className="username">{user_obj.username}</p>
                    </div>
                </div>
            </div>
            {assigned || checked ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-plus"></i>}
        </div>
    )
}

UserItemAssign.propTypes = {
    user_obj: PropTypes.bool,
    checked: PropTypes.bool
}

export default UserItemAssign