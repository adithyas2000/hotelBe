import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import { ErrorMessages, ReservationStatus } from "../../enums/enums";
import Joi from "joi";

export class Discounts {
  travelCompaniesDiscounts(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
