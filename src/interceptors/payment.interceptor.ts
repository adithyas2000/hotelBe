import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages,ReservationStatus } from "../../enums/enums";
import Joi from "joi";

export class PaymentValidators{
    validatePayment(req: Request, res: Response, next: NextFunction) {
      const schema = Joi.object({
        reservation_id: Joi.string().required(),
        total_charged:Joi.number().required()
      });
      const errorState = schema.validate(req.body);
  
      if (errorState.error)
        return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));
  
      next();
    }
  }