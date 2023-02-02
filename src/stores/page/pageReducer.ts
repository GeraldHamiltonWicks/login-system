import { GO_TO_CREATE_ACCOUNT_PAGE, GO_TO_HOME_PAGE, GO_TO_LOGIN_PAGE } from "./pageActions";
import { Page } from "./types";

const saveCurrentPageOnStorage = (page: Page): void => {
    localStorage.setItem('page', JSON.stringify(page));
}

const getCurrentPageFromStorage = (): Page => {
    const page = localStorage.getItem('page');

    if (page === null || page === undefined) {
        return 'login';
    }
    else {
        return JSON.parse(page);
    }
}

const initialPage = 'login';

export const pageReducerFn = (state: Page = initialPage, action: any) => {
    switch(action.type) {
        case GO_TO_HOME_PAGE:
            return 'home';
        case GO_TO_LOGIN_PAGE:
            return 'login';
        case GO_TO_CREATE_ACCOUNT_PAGE:
            return 'createAccount';
        default:
            return state; 
    }
};