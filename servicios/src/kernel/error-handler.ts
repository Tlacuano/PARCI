import { ResponseApi } from "./types";

const errors: { [x: string]: ResponseApi<undefined> } = {
    'Not implemented': { status: 501, error: true, message: 'Not implemented' },
    'Invalid sort by field': { status: 400, error: true, message: 'Invalid sort by field' },
    'Missing fields': { status: 400, error: true, message: 'Missing fields' },
    'Invalid fields': { status: 400, error: true, message: 'Invalid fields' },
    'Already exists': { status: 400, error: true, message: 'Already exists' },
    'User occupied': { status: 400, error: true, message: 'User occupied' },
    'Email occupied': { status: 400, error: true, message: 'Email occupied' },
    'cannot be deleted': { status: 400, error: true, message: 'cannot be deleted' },
    'Bad request': { status: 400, error: true, message: 'Bad Request' },
    'Bad Request': { status: 400, error: true, message: 'Bad Request' },
    'Incorrect credentials': { status: 400, error: true, message: 'Incorrect credentials check your data' },
    'Unauthorized': { status: 401, error: true, message: 'Invalid credentials' },
    'Not found': { status: 404, error: true, message: 'Not found' },
    'No match': { status: 404, error: true, message: 'No match' },
    'Forbidden': { status: 403, error: true, message: 'Forbidden' },
    'Invalid Token': { status: 401, error: true, message: 'Invalid Token' },
    'Expired Token': { status: 401, error: true, message: 'Expired Token' },
    'Not Acceptable': { status: 406, error: true, message: 'Not Acceptable' },
    'Error saving': { status: 500, error: true, message: 'Error saving' },
    'Error sending email': { status: 500, error: true, message: 'Error sending email' },
    'Error generating token': { status: 500, error: true, message: 'Error generating token' },
    'Server Error': { status: 500, error: true, message: 'Internal Server Error' },
};


export const validateError = (error: Error): ResponseApi<undefined> => {
    return errors[error.message] || errors['Server Error'];
}


