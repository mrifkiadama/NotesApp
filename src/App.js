import React from 'react';
import Swal from 'sweetalert2';
import NoteList from './components/NoteList';
import Search from './components/Search';
import AddNote from './components/AddNote';
import Header from './components/Header';
import Footer from './components/Footer';

import { getInitialData } from './utils';
import './styles/App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      darkMode: false,
      keyword: '',

    }
    

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDarkModeChangeEventHandler = this.onDarkModeChangeEventHandler.bind(this);
    this.handleDeleteNote = this.onDeleteNote.bind(this);
    this.handleArchived = this.onArchivedHandler.bind(this);
    this.onSearchEventHandler = this.onSearchEventHandler.bind(this);
    this.unArchiveNotesFilter = this.unArchiveNotesFilter.bind(this);
    this.archivedNotesFilter = this.archivedNotesFilter.bind(this);
  }

  onDarkModeChangeEventHandler() {
    this.setState({ darkMode: !this.state.darkMode });
  }

  onSearchEventHandler(text) {
    this.setState({keyword: text})
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id: +new Date(),
            title,
            body,
            createdAt: new Date(),
            archived: false,
          }
        ]
      }
    });
  }

  unArchiveNotesFilter = (note) => {
    if (this.state.keyword !== '') {
      return !note.archived && note.title.toLocaleLowerCase().match(new RegExp(this.state.keyword.toLowerCase(), 'gi'));
    }

    return !note.archived;
  }

  archivedNotesFilter = (note) => {
    if (this.state.keyword !== '') {
      return note.archived && note.title.toLocaleLowerCase().match(new RegExp(this.state.keyword.toLowerCase(), 'gi'));
    } 

    return note.archived;
  }

  onDeleteNote = (id, title) => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure ?',
      html: `You will be delete this note <b>${title} </b>!!!`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: 'Your note has been deleted',
          showConfirmButton: false,
          timer: 1500,
        });
        const newNotes = this.state.notes.filter((note) => note.id !== id);

        this.setState({ notes: newNotes });
      }
    })
  };

  onArchivedHandler = (id, status) => {
    let message = '';
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          if (status) {
            note['archived'] = true;
            message+= 'on Archived';
            return note;
          } else {
            note['archived'] = false;
            message += 'remove from Archived';
            return note;
          }
        }
        return note;
      })
    })

    Swal.fire({
      icon: 'success',
      title: 'Sucessfully...',
      text: 'You successfully edited Note ' + message
    })
  }

  render() {
    const notesActive = this.state.notes.filter((note) => note.archived === false);
    const notesArchived = this.state.notes.filter((note) => note.archived === true);

    return (
      <div className={`${this.state.darkMode && 'dark-mode'}`}>
        <div className='container'>
          <Header handleToggleDarkMode={this.onDarkModeChangeEventHandler} />
          <AddNote addNote={this.onAddNoteHandler} />
          <Search handleSearchNote={this.onSearchEventHandler} />
          <h2>Note List</h2>
          {notesActive.length !== 0 ? (
             <NoteList notes={notesActive.filter(this.unArchiveNotesFilter)} handleDeleteNote={this.onDeleteNote} handleArchived={this.onArchivedHandler} />
          ) : (
            <h4>Tidak ada catatan</h4>
          )}
         
          <h2>Note List Archived</h2>
            {notesArchived.length !== 0 ? (
                      <NoteList notes={notesArchived.filter(this.archivedNotesFilter)} handleDeleteNote={this.onDeleteNote} handleArchived={this.onArchivedHandler} />
          ) : (
            <h4>Tidak ada catatan</h4>
          )}

          <Footer />

        </div>
      </div>
    );
  }
}

export default App;
