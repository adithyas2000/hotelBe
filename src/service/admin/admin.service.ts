import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { RegisteredUserType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import { TokenServices } from "../../service/token/token.service";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus, UserTypes } from "../../../enums/enums";
import { Admin } from "../../model/admin/admin";
import { Reservation } from "../../model/reservation/reservation";
import { customAlphabet } from "nanoid";
const logger = LoggerGlobal.getInstance().logger;
const tokenVerification = new TokenServices();

export class AdminServices {
  private nanoid = customAlphabet("1234567890ABCDFGHIJKLMNOPQRSTUVWXY", 8);

  async createNewAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin_id = `admin-${this.nanoid()}`;

      const { email, password } = req.body;
      const isAdminExist = await Admin.findOne({ email });

      if (isAdminExist)
        return next(errorResponseHandler(400, ErrorMessages.USER_EXIST));

      await Admin.create({
        email,
        password,
        admin_id,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async removeAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admin_id = req.params.id;

      const isSuperAdmin = await Admin.findOne({ admin_id });

      if (isSuperAdmin.role === UserTypes.SUPER_ADMIN)
        return next(errorResponseHandler(400, ErrorMessages.INVALID_REQUEST));

      await Admin.findOneAndDelete({ admin_id });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getAllAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await Admin.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          admins,
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
