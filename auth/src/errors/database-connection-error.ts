import { ValidationError } from "express-validator"; 

// database specified errors
export class DatabaseConnectionError extends Error {
    statusCode = 500;
    reason = 'Error connecting to DB';
    
    constructor(public errors: ValidationError[]) {
        super();
        
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    } 

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}