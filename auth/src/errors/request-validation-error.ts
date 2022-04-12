import { ValidationError } from "express-validator"; 

interface CustomError {
    statusCode: number,
    serializaErrors(): {
        message: string;
        field?: string;
    }[]
}

export class RequestValidationError extends Error implements CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super();
        
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    } 

    serializaErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}
