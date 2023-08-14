import {useLocation, Link} from 'react-router-dom'


function LinkBtn({path, btn_name, icon_name, size}) {
    const location = useLocation()

    const pathMatch = (route) => {
        if(route === location.pathname){
            return true
        }else{
            return false
        }
    }

  return (
    <Link className='link_btn' to={path} title={btn_name}><i style={{color: pathMatch(path) ? 'black' : '#d3d3d3'}} className={`fa-solid ${icon_name} fa-${size}`}></i></Link>
  )
}

LinkBtn.defaultProps = {
    size: 'lg'
}

export default LinkBtn