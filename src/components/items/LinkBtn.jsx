import {Link} from 'react-router-dom'
import { useContext } from 'react'
import TasksContext from '../../context/TasksContext'


function LinkBtn({path, btn_name, icon_name, size}) {
    const {pathMatch} = useContext(TasksContext)
    

  return (
    <Link className='link_btn' to={path} title={btn_name}><i style={{color: pathMatch(path) ? 'black' : '#d3d3d3'}} className={`fa-solid ${icon_name} fa-${size}`}></i></Link>
  )
}

LinkBtn.defaultProps = {
    size: 'lg'
}

export default LinkBtn