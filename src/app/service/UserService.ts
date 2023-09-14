import APP_CONSTANTS from "../constants";
import { EmployeeDto } from "../dto/EmployeeDto";
import { RegisterUserDto } from "../dto/RegisterUserDto";
import { User } from "../entity/User";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import UserAlreadyRegisteredException from "../exception/UserAlreadyRegisteredException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import UserNotVerifiedException from "../exception/UserNotVerifiedException";
import { UserDao } from "../repository/UserDao";
import { ErrorCodes } from "../util/errorCode";
import SearchResult from "../util/rest/searchresult";

export class UserService {
  constructor(
    private userDao: UserDao,
  ) {}

  public sendOtpForRegistration = async () => {
    // logic to send OTP
  }

  public registerUser = async (
    userRegistrationData: RegisterUserDto
  ): Promise<any> => {
    const user = await this.userDao.getByPhoneNumber(userRegistrationData.phoneNumber);

    if (user) {
      if (user.status === "verified") {
        const error = ErrorCodes.USER_ALREADY_REGISTERED_ERROR;
        throw new UserAlreadyRegisteredException();
      }
      await this.sendOtpForRegistration();
      return user;
    }
    // employeeData.password = await bcrypt.hash(employeeData.password, 10); // Do later
    const registeredUserData: User = await this.userDao.register(userRegistrationData);
    await this.sendOtpForRegistration();
    return registeredUserData;
  }

  public getUsers = async (params:any): Promise<SearchResult> => {
    const {data, total} = await this.userDao.getAllUsers(params);
    return {
      data: data,
      length: data.length,
      total
    };
  }

  public getById = async (userId: string): Promise<User> => {
    const userData = await this.userDao.getById(userId);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return userData;
  }

  public getUserByPhoneNumber = async (phoneNumber: string): Promise<User> => {
    const userData = await this.userDao.getByPhoneNumber(phoneNumber);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    return userData;
  }

  public login = async (phoneNumber: string, password: string): Promise<boolean> => {
    const userData = await this.userDao.getByPhoneNumber(phoneNumber);
    if (!userData) {
      const error = ErrorCodes.USER_NOT_FOUND;
      throw new EntityNotFoundException(error);
    }
    if (userData) {
      if (userData.status !== "verified") {
        throw new UserNotVerifiedException()
      }
      return this.verifyPassword(password, userData.password)
    }
    return false;
  }

  public verifyOtp = async (otp: number, userId: string): Promise<boolean> => {
    if (otp === APP_CONSTANTS.otp) {
      return await this.userDao.updateUserStatus(userId);
    }
    return otp === APP_CONSTANTS.otp;
  }

  // add bcrypt logic
  private verifyPassword = (inputPassword: string, userPassword: string): boolean => {
    return inputPassword === userPassword;
  }

}
