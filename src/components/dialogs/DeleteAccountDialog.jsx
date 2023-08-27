import { useContext } from "react"
import ProfileContext from "../../context/ProfileContext"

function DeleteAccountDialog() {
    const {accountDialog, closeDialog, openConfirmation} = useContext(ProfileContext)

  return (
    <div className={`delete-acc-dialog ${accountDialog ? 'dialog-shown' : ''}`}>
        <p>Are you sure you want to delete your account 🥺?</p>
        <div>
            <button onClick={closeDialog} className="cancel">No</button>
            <button onClick={openConfirmation} className="delete-task">Yes</button>
        </div>
    </div>
  )
}

export default DeleteAccountDialog