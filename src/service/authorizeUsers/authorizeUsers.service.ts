import { Request, Response, NextFunction } from "express";
import { ErrorMessages, UserTypes } from "../../../enums/enums";
import { AuthorizeUserServicesInterface } from "../../../types";
import errorResponseHandler from "../../../utils/errorResponseHandler";

export class AuthorizeUsersService implements AuthorizeUserServicesInterface {
  async checkUserRoleSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (req.user.role !== UserTypes.SUPER_ADMIN) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }

  async checkUserRoleRegAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== UserTypes.ADMIN) {
      return next(errorResponseHandler(403, ErrorMessages.UNAUTHORIZED_USER));
    }
    next();
  }
}
