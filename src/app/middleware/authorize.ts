import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { getTokenFromRequestHeader } from "../util/appUtil";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";


const authorize = () => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.ID_TOKEN_SECRET);
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
};

export default authorize;