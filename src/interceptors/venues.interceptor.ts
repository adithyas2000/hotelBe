import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages } from "../../enums/enums";
import Joi from "joi";

export class VenuesValidators {
  cerateANewVenueValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      venue_name: Joi.string().required(),
      venue_address: Joi.string().required(),
      venue_city: Joi.string().required(),
      venue_contact_number: Joi.string().required(),
      rooms: Joi.array()
        .required()
        .items(
          Joi.object({
            room_type: Joi.string().required(),
            max_no_of_occupants: Joi.number().required(),
            no_of_rooms: Joi.number().required(),
            base_fee: Joi.number().required(),
          })
        ),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  updateVenueValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      venue_name: Joi.string().required(),
      venue_address: Joi.string().required(),
      venue_city: Joi.string().required(),
      venue_contact_number: Joi.string().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
  updateRoomValidator(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      room_type: Joi.string().required(),
      max_no_of_occupants: Joi.number().required(),
      no_of_rooms: Joi.number().required(),
      base_fee: Joi.number().required(),
    });
    const errorState = schema.validate(req.body);

    if (errorState.error)
      return next(errorResponseHandler(400, ErrorMessages.EMPTY_INPUT_FIELDS));

    next();
  }
}
