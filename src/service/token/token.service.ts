import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { RegisteredUserType, TokenServicesInterface } from "../../../types";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import LoggerGlobal from "../../../logger/loggerSingelton";
import { Admin } from "../../model/admin/admin";
const logger = LoggerGlobal.getInstance().logger;

export class TokenServices implements TokenServicesInterface {
  async verifyUser(req: Request, res: Response, next: NextFunction) {
    //check the token exist
    if (!req.headers.authorization)
      return next(errorResponseHandler(401, ErrorMessages.REQUEST_TO_LOGIN));
    
    let token = req.headers.authorization.split(" ")[1];

    if (!token)
      return next(errorResponseHandler(401, ErrorMessages.REQUEST_TO_LOGIN));
    
    try {
      // decode the token
      const decodedUserId = jwt.verify(
        token,
        `${process.env.TOKEN}`,
        function (err: Error, decoded: any) {
          if (err) {
            const errorMessage =
              err.name === "TokenExpiredError"
                ? ErrorMessages.TOKEN_EXPIRED
                : ErrorMessages.INVALID_TOKEN;

            return next(errorResponseHandler(400, errorMessage));
          }
          return decoded.id;
        }
      );
      //check if user still exists
      let currentUser: any;

      const admin = await Admin.findById(decodedUserId);
      currentUser = admin;

      if (!currentUser)
        return next(
          errorResponseHandler(400, ErrorMessages.USER_DOES_NOT_EXIST)
        );

      req.user = currentUser;
      next();
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async signToken(user: RegisteredUserType, next: NextFunction) {
    const { _id, role, email } = user;
    try {
      const token = await jwt.sign(
        { id: _id, role, email },
        `${process.env.TOKEN}`,
        {
          expiresIn: `${process.env.TOKEN_EXPIRES_IN}`,
        }
      );
      return token;
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async signRefreshToken(user: RegisteredUserType, next: NextFunction) {
    const { _id, role, email } = user;

    try {
      const token = await jwt.sign(
        { id: _id, role, email },
        `${process.env.REFRESH_TOKEN}`,
        {
          expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}`,
        }
      );
      return token;
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const decodedUser = await jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN}`,
        function (err: Error, decoded: any) {
          if (err) {
            const errorMessage =
              err.name === "TokenExpiredError"
                ? ErrorMessages.TOKEN_EXPIRED
                : ErrorMessages.INVALID_TOKEN;

            return next(errorResponseHandler(400, errorMessage));
          }

          return {
            id: decoded.id,
            userType: decoded.userType,
            name: decoded.name,
            email: decoded.email,
          };
        }
      );

      const token = await this.signToken(decodedUser, next);
      const newRefreshToken = await this.signRefreshToken(decodedUser, next);

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        token,
        refreshToken: newRefreshToken,
      });
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
