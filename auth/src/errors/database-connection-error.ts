import { ValidationError } from "express-validator"; 
import { CustomError } from "./custom-error";

// database specified errors
export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to DB';
    
    constructor(public errors: ValidationError[]) {
        super('Error connecting to DB');
        
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    } 

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}