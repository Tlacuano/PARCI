export const regexContrena =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/


export const validateRegex = (regex: RegExp, value: string) => {
    const result = regex.test(value);
    if (!result) {
        return false;
    }
}