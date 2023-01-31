import { User } from "../../stores/users";
import { Note } from "./types";

export const storage = {
    getTheme: (): string => {
        const userID = localStorage.getItem('userID');
        const theme = localStorage.getItem(`theme-${userID}`);
    
        if (theme === null) {
            return 'blue';
        }
        else {
            return theme;
        }
    },

    saveTheme: (themeColor: string): void => {
        const userID = localStorage.getItem('userID');
        localStorage.setItem(`theme-${userID}`, themeColor);
    },

    getNotes: (): Array<Note> => {
        const userID = localStorage.getItem('userID');
        const notes = localStorage.getItem(`notes-${userID}`);

        if (notes === null) {
            return [];
        }
        else {
            return JSON.parse(notes);
        }
    },

    saveNotes: (notes: Array<Note>): void => {
        const userID = localStorage.getItem('userID');
        localStorage.setItem(`notes-${userID}`, JSON.stringify(notes));
    },

    saveUserID: (users: Array<User>, email: string): void => {
        const currentUserID = (users.find(user => user.email === email))?.id;
    
        if (currentUserID !== undefined) {
            localStorage.setItem('userID', currentUserID.toString())
        }
    },
};