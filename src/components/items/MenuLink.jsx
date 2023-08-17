import {Link} from 'react-router-dom'
import { useContext } from 'react'
import TasksContext from '../../context/TasksContext'


function LinkBtn({path, btn_name, icon_name, size, page}) {
    const {pathMatch} = useContext(TasksContext)
    

  return (
    <Link className={`link_btn ${pathMatch(path) ? 'active' : ''}`} to={path} title={btn_name}><i className={`fa-solid ${icon_name} fa-${size}`}></i>{page}</Link>
  )
}

LinkBtn.defaultProps = {
    size: 'md',
    page: 'Home'
}

export default LinkBtn