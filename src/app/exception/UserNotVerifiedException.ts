import HttpException from "./HttpException";
import { ErrorCodes } from "../util/errorCode";

/**
 * This exception can use used in case a user is not authorized to perform an action.
 */
class UserNotVerifiedException extends HttpException {
    constructor() {
        const errorDetail = ErrorCodes.USER_NOT_VERIFIED_ERROR;
        super(401, errorDetail.MESSAGE, errorDetail.CODE);
    }
}

export default UserNotVerifiedException;
