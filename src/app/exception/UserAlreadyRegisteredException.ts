import HttpException from "./HttpException";
import { ValidationError } from "class-validator";
import { ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used to notify and describe validation errors.
 */
class UserAlreadyRegisteredException extends HttpException {

    constructor() {
        const error = ErrorCodes.USER_ALREADY_REGISTERED_ERROR;
        super(400, error.MESSAGE, error.CODE);
    }
}

export default UserAlreadyRegisteredException;
