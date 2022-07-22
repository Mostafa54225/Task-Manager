export class CustomeAPIError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const createCustomeError = (msg, statusCode) => {
    return new CustomeAPIError(msg, statusCode)
}