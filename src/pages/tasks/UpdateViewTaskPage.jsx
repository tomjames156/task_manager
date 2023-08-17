import { useContext } from "react"
import TaskContext from "../../context/TaskContext"
import ViewAddUpdateTask from "../templates/ViewAddUpdateTask"

function UpdateViewTaskPage() {
    let {current_task} = useContext(TaskContext)

  return (
    <ViewAddUpdateTask task={current_task} />
  )
}

export default UpdateViewTaskPage