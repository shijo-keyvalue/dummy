/**
 * Wraps Controllers for easy import from other modules
 */

import UserController from "./UserController";
import { UserService } from "../service/UserService";
import { UserDao } from "../repository/UserDao";

const userDao = new UserDao();
const userService = new UserService(userDao);

export default [
  new UserController(userService),
];
