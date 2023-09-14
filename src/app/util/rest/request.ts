import { Request } from "express";

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
  // To use userId and role, please inject the same in a middleware, by decoding an access token.
  userId: string;
  role: string;
  startTime?: number;
  userAgent?: { [key: string]: any };
}
