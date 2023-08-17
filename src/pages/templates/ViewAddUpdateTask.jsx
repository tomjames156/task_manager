import TaskItem from "../../components/items/TaskItem"
import Header from "../../components/sectioning/Header"

function ViewAddUpdateTask({task}) {
  return (
    <div className="container">
      <Header/>
      <main>
        {task ? <TaskItem task_obj={task}/> : 
        <p>New Task</p>}
      </main>
    </div>
  )
}

export default ViewAddUpdateTask