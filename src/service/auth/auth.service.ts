import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { RegisteredUserType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import { TokenServices } from "../../service/token/token.service";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { Admin } from "../../model/admin/admin";
const logger = LoggerGlobal.getInstance().logger;
const tokenVerification = new TokenServices();

export class AuthenticationServices {
  private registeredUser = {} as RegisteredUserType;

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email }).select("+password").lean();
      this.registeredUser = admin;

      if (
        !this.registeredUser ||
        !(await bcrypt.compare(req.body.password, this.registeredUser.password))
      )
        return next(
          errorResponseHandler(400, ErrorMessages.INVALID_CREDENTIALS)
        );

      const token = await tokenVerification.signToken(
        this.registeredUser,
        next
      );
      const refreshToken = await tokenVerification.signRefreshToken(
        this.registeredUser,
        next
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        token,
        refreshToken,
        data: {
          user: {
            userRole: this.registeredUser.role,
          },
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
