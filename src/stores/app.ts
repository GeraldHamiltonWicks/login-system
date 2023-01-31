import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "@reduxjs/toolkit";
import { Page, pageReducerFn } from './page';
import { User, usersReducerFn } from './users';

export type State = {
    page: Page;
    users: Array<User>
};

const rootReducer = combineReducers({
    page: pageReducerFn,
    users: usersReducerFn
});

export const store = configureStore({
    reducer: rootReducer
});

