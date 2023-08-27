import { useContext, useState } from "react"
import ProfileContext from "../../context/ProfileContext"

function ConfirmationDialog() {
    const {profile, accountDialog, closeConfirmation} = useContext(ProfileContext)
    const [confirmationText, setConfirmationText] = useState('')
    let confirmation_text = `I, ${profile.username} am deleting my account`


    const handleSubmit = (e) => {
      e.preventDefault()
      if(confirmationText === confirmation_text){
        console.log("Account Deleted Successfully")
      }
    }

  return (
    <div className={`delete-acc-dialog acc-deletion ${accountDialog ? 'dialog-shown' : ''}`}>
        <p>To confirm, type "<span>I, {profile.username} am deleting my account</span>" below</p>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setConfirmationText(e.target.value)} type="text" name="confirmation_text" value={confirmationText || ''} />
            <div>
              <button onClick={closeConfirmation} className="cancel">Cancel</button>
              <button type="submit" className="delete-task">Delete</button>
            </div>
        </form>
    </div>
  )
}

export default ConfirmationDialog