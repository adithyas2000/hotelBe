import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { Reservation } from "../../model/reservation/reservation";
const logger = LoggerGlobal.getInstance().logger;

export class ReservationServices {
  private nanoid = customAlphabet("1234567890ABCDFGHIJKLMNOPQRSTUVWXY", 8);
  async createANewReservation(req: Request, res: Response, next: NextFunction) {
    try {
      const reservation_id = `rev-${this.nanoid()}`;

      const newReservation = await Reservation.create({
        reservation_id,
        ...req.body,
      });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          reservation_id: newReservation.reservation_id,
          email: newReservation.email,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
