import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import firebase from 'firebase';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
      email: null
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr) {
        this.props.history.push('/login');
      } else {
        this.setState({email: _usr.email});
        firebase
        .firestore()
        .collection('notes')
        .where('user', '==', _usr.email)
        .onSnapshot(serverUpdate => {
          const notes = serverUpdate.docs.map( _doc => {
            const data = _doc.data();
            data['id'] = _doc.id;
            return data;
          });
          this.setState({notes: notes});
        });
      }
    });
  }

  render() {
    return(
      <div>
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex} 
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}>
        </SidebarComponent>
        {
          this.state.selectedNote ?
          <EditorComponent selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}></EditorComponent>
          : null
        }
        <button onClick={this.signOut} className="signOutBtn">Sign Out</button>       
      </div>
    );
  };

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note});
  noteUpdate = (id, noteObj) => {
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title: noteObj.title, 
      body: noteObj.body, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  signOut = () => firebase.auth().signOut();

  newNote = async (title) => {
    if (title) {
      const note = {
        title: title,
        body: ''
      };
      const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        user: this.state.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newID = newFromDB.id;
      await this.setState({notes: [...this.state.notes, note]});
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
      this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex})
    }     
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note)})
    if(this.state.selectedNoteIndex === noteIndex) {
        this.setState({
        selectedNoteIndex: null, selectedNote: null
      })
    } else {
      this.state.notes.length >= 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex -1 ], this.state.selectedNoteIndex -1) :
      this.setState({
        selectedNoteIndex: null, selectedNote: null
      })

      firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
    }
  }
}

export default App;
