import axios from 'axios';
import { User } from '../../stores/users';

const BACK_END_URI = 'http://localhost:3001';

export const sendCode = async (email: string): Promise<Error | string> => {
    return (await api.post('/sendcode', { email })).data;
}

export const isValidCode = async (code: Array<string>): Promise<boolean | Error> => {
    return (await api.post('/checkcode', { "codeToBeChecked": code })).data;
}

export const encryptPassword = async (password: string, email: string): Promise<string> => {
    return (await api.post('/encrypt', { password, email })).data;
}

export const isUserAuthenticated = async (email: string, password: string, users: Array<User>): Promise<boolean> => {
    return (await api.post('/auth', { email, password, users })).data;
}

export const api = axios.create({
    baseURL: BACK_END_URI,
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});