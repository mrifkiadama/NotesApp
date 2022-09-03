import React from "react";

import { FaBookmark, FaRegBookmark, FaTrashAlt } from "react-icons/fa";
import { showFormattedDate } from '../../utils';

function Note({ id, title, body, createdAt, archived, handleDeleteNote, handleArchived }) {
  const isArchived = archived;
  let status;


  if (isArchived) {
    status = <FaBookmark className="bookmark-icon" size='1.3em' onClick={() => handleArchived(id,false)} />;
  } else {
    status = <><FaRegBookmark className="bookmark-icon" size='1.3em' onClick={() => handleArchived(id,true)} /><FaTrashAlt onClick={() => handleDeleteNote(id,title)} className='delete-icon' size='1.3em' /></>;
  }

  return (
    <div className="note">
      <span className="note-title">{title}</span>
      <p>{body}</p>
      <div className='note-footer'>
        <small>{showFormattedDate(createdAt)}</small>
        <span>{status}</span>
      </div>
    </div>
  );
}



export default Note;
