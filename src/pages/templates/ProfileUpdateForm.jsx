import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import ProfileContext from "../../context/ProfileContext"


function ProfileUpdateForm({profile}) {
    const [formData, setFormData] = useState(null)
    const {updateProfile} = useContext(ProfileContext)
    const mover = useNavigate()

    useEffect(() => {
        setFormData({
            bio: profile.bio,
            firstname: profile.firstname,
            lastname: profile.lastname,
            profile_pic: profile.profile_pic,
            email: profile.email
        })
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfile(formData)
        mover('/profile')
    }
  

    return (
        <>
        <h1><Link title="Back" to='/profile'><i className="fa-solid fa-angle-left"></i></Link></h1>
            <form onSubmit={handleSubmit} className="profile-update-form">
                <div className="update-img" title="Change Image">
                    <img src={formData?.profile_pic ? formData.profile_pic.substring(20,) : '/profile_pics/no_pfp.jpeg'} alt={`${profile.username}'s profile pic`} />
                    <i className="fa-solid fa-camera fa-xl"></i>
                </div>
                <h2 style={{textAlign: 'center'}}>Edit Profile</h2>
                <label htmlFor="firstname">First name:</label>
                <input type="text" name="firstname" id="firstname" value={formData?.firstname || ''} onChange={handleChange}/>
                <label htmlFor="lastname">Last name:</label>
                <input type="text" name="lastname" id="lastname" value={formData?.lastname || ''} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={formData?.email || ''} onChange={handleChange} />
                <label htmlFor="bio">Bio:</label>
                <textarea rows={7} maxLength={200} type="text" name="bio" id="bio" value={formData?.bio || ''} onChange={handleChange}></textarea><small className="word-count">{`${formData?.bio.length}/200`}</small>
                <button type="submit">Update</button>
                <div className='logout-container'><span style={{ marginTop: '1rem', textAlign: 'right', width: 'fit-content', color: 'red' }} className='delete_acc_btn' title="Sign Out"><i className="fa-solid fa-user-minus"></i>Delete Account</span></div>
            </form>
        </>
    )
}

export default ProfileUpdateForm