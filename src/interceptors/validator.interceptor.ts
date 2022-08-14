import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class UserInputValidators {
  userLoginValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }

  refreshTokenValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
}
