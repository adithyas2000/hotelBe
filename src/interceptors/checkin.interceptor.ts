import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages, ReservationStatus } from "../../enums/enums";
import Joi from "joi";
import LoggerGlobal from "../../logger/loggerSingelton";
const logger = LoggerGlobal.getInstance().logger;

export class CheckinValidators {
  webCheckinValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      reservation_id: Joi.string().required(),
      arrival_date: Joi.string().required(),
      status: Joi.string().valid(ReservationStatus.CHECKED_IN)
    });
    const errorState = schema.validate(req.body);

    if (errorState.error) {
      logger.error(errorState.error);
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));
    }
    next();
  }
}