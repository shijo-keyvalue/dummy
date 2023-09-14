import { NextFunction, Response } from "express";
import APP_CONSTANTS from "../constants";
import { LoginDto } from "../dto/LoginDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import validationMiddleware from "../middleware/validationMiddleware";
import { UserService } from "../service/UserService";
import { AbstractController } from "../util/rest/controller";
import RequestWithUser from "../util/rest/request";
/**
 * Implementation of the UserController route.
 *
 */
class UserController extends AbstractController {
  private userService: UserService;

  constructor(userService: UserService) {
    super(`${APP_CONSTANTS.apiPrefix}/users`);
    this.userService = userService;
    this.initializeRoutes();
  }

  protected initializeRoutes = (): void => {
    this.router.get(
      `${this.path}`,
      this.asyncRouteHandler(this.getUsers)
    )
    this.router.get(
      `${this.path}/:id`,
      this.asyncRouteHandler(this.getUserById)
    )
    this.router.post(
      `${this.path}/register`,
      this.asyncRouteHandler(this.registerUser)
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LoginDto, APP_CONSTANTS.body),
      this.asyncRouteHandler(this.login)
    );
    this.router.post(
      `${this.path}/:id/verify-otp`,
      this.asyncRouteHandler(this.verifyOtp)
    );
  }

  private registerUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const employeeData: RegisterUserDto = request.body;
    const employeeDetail = await this.userService.registerUser(
      employeeData
    );
    response.send(
      this.fmt.formatResponse(
        employeeDetail,
        Date.now() - request.startTime,
        "OK"
      )
    );
  }

  private getUsers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const getUsersParams: any = request.query;
    const employeeDetails = await this.userService.getUsers(
      getUsersParams
    );

    const { data, total } = await this.userService.getUsers(getUsersParams);
    // Not setting total for now

    response.send(
      this.fmt.formatResponse(
        data,
        Date.now() - request.startTime,
        "OK",
        total
      )
    );
  }

  private getUserById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    // const getUsersParams: any = request.params;
    // const employeeDetails = await this.userService.getAllUsers(
    //   getUsersParams
    // );
    // response.send(
    //   this.fmt.formatResponse(
    //     employeeDetails,
    //     Date.now() - request.startTime,
    //     "OK"
    //   )
    // );
    const userId = request.params.id;
    const data = await this.userService.getById(userId);
    response.send(
      this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData: LoginDto = request.body;
    const loginDetail = await this.userService.login(
      loginData.phoneNumber,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  }

  private verifyOtp = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const otp = request.body.otp;
    const userId = request.params.id;
    const loginDetail = await this.userService.verifyOtp(otp, userId);
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  }
}

export default UserController;
