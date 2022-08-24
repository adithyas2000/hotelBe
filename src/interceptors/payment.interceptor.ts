import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages,ReservationStatus } from "../../enums/enums";
import Joi from "joi";

export class PaymentValidators{
    validatePayment(req: Request, res: Response, next: NextFunction) {
      const schema = Joi.object({
        reservation_id: Joi.string().required(),
        optional_charges:Joi.array().optional(),
        fee_for_the_period:Joi.number().optional(),
        no_of_additional_nights:Joi.number().optional(),
        fee_for_additional_nights:Joi.number().optional(),
        total_charged:Joi.number().optional()
      });
      const errorState = schema.validate(req.body);
  
      if (errorState.error)
        return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));
  
      next();
    }
  }