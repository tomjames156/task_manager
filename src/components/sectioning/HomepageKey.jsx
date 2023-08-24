import React from 'react'

function HomepageKey() {
  return (
    <div className='key'>
        <div>
          <i className="fa-solid fa-circle-xmark"></i>
          <span>- Not Completed</span>
        </div>
        <div>
          <i className="fa-solid fa-circle-check"></i>
          <span>- Completed</span>
        </div>
        <div>
          <i className='fa-solid fa-user'></i>
          <span>- Self Assigned</span>
        </div>
    </div>
  )
}

export default HomepageKey