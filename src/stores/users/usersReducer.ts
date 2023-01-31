import { CREATE_ONE_USER, DELETE_ONE_USER } from './usersAction';
import { User } from './types';

const getIdFromUsers = (users: Array<User>): number => {
    const ids = users.length > 0 ? users.map((user: User) => user.id) : [0];
    const newId = Math.max(...ids) + 1;
    return newId;
}

const saveUsersOnStorage = (users: Array<User>): void => {
    localStorage.setItem('users', JSON.stringify(users));
}

const getUsersFromStorage = (): Array<User> => {
    const stringifyUsers = localStorage.getItem('users');

    if (stringifyUsers === null) {
        return [];
    }
    else {
        return JSON.parse(stringifyUsers);
    }
}

const initialUsers: Array<User> = getUsersFromStorage();

export const usersReducerFn = (state = initialUsers, action: any) => {
    switch(action.type) {
        case CREATE_ONE_USER:
            const id = getIdFromUsers(state);
            const usersAfterCreate = [...state, { ...action.data, id }];
            
            saveUsersOnStorage(usersAfterCreate);
            return usersAfterCreate;

        case DELETE_ONE_USER:
            const usersAfterDelete = state.filter((user: User) => user.id !== action.data);
            saveUsersOnStorage(usersAfterDelete);
            return usersAfterDelete;

        default:
            saveUsersOnStorage(state);
            return state;
    }
}