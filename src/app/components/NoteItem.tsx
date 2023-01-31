import { ReactElement } from "react";
import { Note } from "../helpers";

interface NoteProps {
    note: Note;
    theme: string;
    deleteNote: (id: number) => void;
}

export const NoteItem = (props: NoteProps): ReactElement => {
    const deleteNoteItem = (id: number): void => {
        props.deleteNote(id);
    }

    return (
        <div className={`note-item note-item-${props.theme}`}>
            <h3 className="title">{props.note.title}</h3>
            <h3 className="description">{props.note.description}</h3>
            <button onClick={() => deleteNoteItem(props.note.id)}>DELETE</button>
        </div>
    );
}