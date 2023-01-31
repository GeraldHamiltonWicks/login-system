import { isEmpty, removeSpacesFromString } from "./utils";

export const isValidEmail = (email: string): boolean => {
    const emailWithoutSpace = removeSpacesFromString(email);

    if (!emailWithoutSpace.includes('@')) {
        return false
    }

    const splitedEmailOnAt = emailWithoutSpace.split('@');
    const [textBeforeAt, textAfterAt] = splitedEmailOnAt;

    const splitedTextOnDot = textAfterAt.split('.');
    const [textBeforeDot, textAfterDot] = splitedTextOnDot;

    const hasSpaceOnEmail = emailWithoutSpace !== email;
    if (hasSpaceOnEmail) {
        return false;
    }

    const hasTextBeforeAndAfterAtSymbol = splitedEmailOnAt.length === 2;
    if (!hasTextBeforeAndAfterAtSymbol) {
        return false;
    }

    const hasTextBeforeAndAfterDot = splitedTextOnDot.length === 2;
    if (!hasTextBeforeAndAfterDot) {
        return false;
    }

    if (isEmpty(textBeforeAt)) {
        return false;
    }

    if (isEmpty(textAfterAt)) {
        return false;
    }

    if (isEmpty(textBeforeDot)) {
        return false;
    }

    if (isEmpty(textAfterDot)) {
        return false;
    }

    return true;
}

export const isValidPassword = (password: string): boolean => {
    const passwordWithoutSpace = removeSpacesFromString(password);

    if (isEmpty(password)) {
        return false;
    }

    const hasSpaceOnPassword = passwordWithoutSpace !== password;
    if (hasSpaceOnPassword) {
        return false;
    }

    return passwordWithoutSpace.length >= 6;
}

export const isCodeEmpty = (code: Array<string>): boolean => {
    const textCode = code.join('');

    if (isEmpty(textCode)) {
        return true;
    }

    return textCode.length < 5;
}