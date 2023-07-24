import React from 'react'

function ListItem({note_obj}) {
    const date = new Date(note_obj.date_created)
  return (
    <div className='task-item' style={{background: note_obj.note_colour}}><p>{note_obj.body}</p><span className='date'>{date.toDateString().slice(3,)}</span>{note_obj?.is_new ? <i className="fa-solid fa-circle-plus"></i> : <i class="fa-solid fa-circle-check"></i>}</div>
  )
}

export default ListItem