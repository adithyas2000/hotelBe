import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class ReservationValidators {
  webReservationValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      customer_name: Joi.string().required(),
      customer_address: Joi.string().required(),
      customer_contact_number: Joi.string().required(),
      arrival_date: Joi.string().required(),
      departure_date: Joi.string().required(),
      hotel_id: Joi.string().required(),
      rooms: Joi.array()
        .required()
        .items(
          Joi.object({
            room_type: Joi.string().required(),
            no_of_occupants: Joi.number().required(),
          })
        ),
      credit_card_details: Joi.object().optional().keys({
        credit_card_number: Joi.string().required(),
        credit_card_expiry_date: Joi.string().required(),
        credit_card_cvv: Joi.string().required(),
        card_holder_name: Joi.string().required(),
      }),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error){
      console.log("Validation error: "+errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));
  }
    next();
  }
}