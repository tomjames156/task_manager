import React from 'react'

function UrgencyKey() {
  return (
    <div className='key'>
        <div>
            <span></span>
            <span>- Past Due Date</span>
        </div>
        <div>
            <span></span>
            <span>- Due Today</span>
        </div>
        <div>
            <span></span>
            <span>- Due Tomorrow</span>
        </div>
        <div>
            <span></span>
            <span>- Due in 2 days</span>
        </div>
        <div>
            <span></span>
            <span>- 3 days or more</span>
        </div>
    </div>
  )
}

export default UrgencyKey