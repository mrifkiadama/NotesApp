import React from "react";
import Note from "../Note";

function NoteList({ notes, handleDeleteNote, handleArchived }) {

	return (
		<>
			<div className='notes-list'>
				{notes.map((note) => (
					<Note key={note.id} 
						id={note.id}
						title={note.title}
						body={note.body}
						createdAt={note.createdAt}
						archived={note.archived}
						handleDeleteNote={handleDeleteNote}
						handleArchived={handleArchived}
					/>
				))}
			</div>
		</>
	);
}


export default NoteList;
