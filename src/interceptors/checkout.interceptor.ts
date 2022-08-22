import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class CheckoutValidators{
    webCheckoutValidator(req: Request, res: Response, next: NextFunction) {
      const schema = Joi.object({
        reservation_id: Joi.string().required(),
        
        departure_date: Joi.string().required()
      });
      const errorState = schema.validate(req.body);
  
      if (errorState.error)
        return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));
  
      next();
    }
  }