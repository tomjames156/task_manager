import TaskItem from "../../components/items/TaskItem"
import Header from "../../components/sectioning/Header"

function AddTaskPage() {
  return (
    <div className="container">
      <Header/>
      <main>
        <TaskItem task_obj={null}/>
      </main>
    </div>
  )
}


export default AddTaskPage