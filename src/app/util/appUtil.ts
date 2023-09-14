import APP_CONSTANTS from "../constants";
import { Request } from "express";

const getTokenFromRequestHeader = (req: Request) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};



export { getTokenFromRequestHeader };
