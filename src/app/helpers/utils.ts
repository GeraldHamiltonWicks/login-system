export const removeSpacesFromString = (data: string): string => {
    return data.replace(/\s/g, '');
}

export const isEmpty = (data: string | Array<string> | any): boolean => {
    if (isString(data) || isArray(data)) {
        return data.length === 0;
    }
    if (isObject(data)) {
        return data.keys() === 0;
    }
    if (isNull(data) || isUndefined(data)) {
        return true;
    }
    return false;
}

export const isNotEmpty = (data: string | Array<string> | any): boolean => {
    return !isEmpty(data);
}

export const isNull = (data: any): boolean => {
    return data === null;
}

export const isNotNull = (data: any): boolean => {
    return !isNull(data);
}

export const isUndefined = (data: any): boolean => {
    return data === undefined;
}

export const isNotUndefined = (data: any): boolean => {
    return !isUndefined(data);
}

export const isObject = (data: any): boolean => {
    return typeof data === 'object' && data !== null;
}

export const isString = (data: any): boolean => {
    return typeof data === 'string'
}

export const isNotString = (data: any): boolean => {
    return !isString(data);
}

export const isArray = (data: any): boolean => {
    return Array.isArray(data);
}