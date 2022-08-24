import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class AddOnsValidators {
  addNewChargeValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      addonName: Joi.string().required(),
      charge: Joi.number().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
}
