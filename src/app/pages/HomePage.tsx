import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { GO_TO_LOGIN_PAGE } from "../../stores/page";
import { Icon, NoteItem } from "../components";
import { Note, storage } from "../helpers";

export const HomePage = (): ReactElement => {
  const [ isToShowThemeSelector, setIsToShowThemeSelector] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');

  const initialNotes = storage.getNotes();
  const [notes, setNotes] = useState(initialNotes);

  const initialTheme = storage.getTheme();
  const [theme, setTheme] = useState(initialTheme);
  
  const dispatch = useDispatch();

  const changeTheme = (newThemeColor: string): void => {
    setTheme(newThemeColor);
    storage.saveTheme(newThemeColor);
    toggleThemeSelector();
  }

  const toggleThemeSelector = (): void => {
    setIsToShowThemeSelector(!isToShowThemeSelector);
  }

  const logout = (): void => {
    dispatch({ type: GO_TO_LOGIN_PAGE })
  }

  const updateTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTitle(inputValue)
  }

  const updateDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setDescription(inputValue);
  }

  const addNote = (): void => {
    const ids = notes.length > 0 ? notes.map((note: Note) => note.id) : [0];
    const newID = Math.max(...ids) + 1;
    const newNotes = [...notes, {
        id: newID,
        title,
        description
      }
    ];
    setNotes(newNotes);
    storage.saveNotes(newNotes);

    setTitle('');
    setDescription('');
  }

  const deleteNote = (id: number): void => {
    const notesAfterDelete = notes.filter(note => note.id !== id);
    setNotes(notesAfterDelete);
    storage.saveNotes(notesAfterDelete);
  }

  return (
    <div id="home">
      <div className={`navbar navbar-${theme}`}>
        <div className="left-content">
        <h2>Keeper</h2>
        </div>
        <div className="right-content">
        <div className="theme-action">
          <button onClick={toggleThemeSelector}>
            <Icon iconSelector="theme" />
          </button>
          <h5 onClick={toggleThemeSelector}>Theme</h5>
            <div className={`theme-selector`} hidden={!isToShowThemeSelector}>
              <div onClick={() => changeTheme('blue')}><button className="blue-theme"></button></div>
              <div onClick={() => changeTheme('yellow')}><button className="yellow-theme"></button></div>
              <div onClick={() => changeTheme('purple')}><button className="purple-theme"></button></div>
            </div>
        </div>
        <div className="logout-action" onClick={logout}>
          <button>
            <Icon iconSelector="logout" />
          </button>
          <h5>Logout</h5>
        </div>
        </div>       
      </div>
      <div className={`add-note-card add-note-card-${theme}`}>
        <div><input value={title} onChange={updateTitleInput} type="text" placeholder="Title" maxLength={28}/></div>
        <div><textarea value={description} onChange={updateDescriptionInput} placeholder="Take a note..." maxLength={80}></textarea></div>
        <button onClick={addNote}>+</button>
      </div>
      <div className="notes-list">
        {notes.map((note: Note) => 
        <NoteItem note={note} theme={theme} deleteNote={deleteNote} key={note.id} />)
        }
      </div>
    </div>
  );
};
