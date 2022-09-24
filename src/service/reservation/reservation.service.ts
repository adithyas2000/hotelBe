import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import {
  ErrorMessages,
  ReservationStatus,
  ResponseStatus,
} from "../../../enums/enums";
import { Reservation } from "../../model/reservation/reservation";
import { HotelRoom } from "../../model/hotelRooms/hotelRooms";
import { daysDifference } from "../../../utils/daysDifference";
const logger = LoggerGlobal.getInstance().logger;

export class ReservationServices {
  private nanoid = customAlphabet("1234567890ABCDFGHIJKLMNOPQRSTUVWXY", 8);
  async createANewReservation(req: Request, res: Response, next: NextFunction) {
    try {
      const reservation_id = `rev-${this.nanoid()}`;
      req.body.reservation_id = reservation_id;
      const { room, hotel_id, arrival_date, departure_date } = req.body;
      const roomTypeId = room.room_type_id;

      const baseFee = await HotelRoom.findOne({
        $and: [{ hotel_id }, { room_type_id: roomTypeId }],
      }).select("base_fee");
      const difference = daysDifference(arrival_date, departure_date);
      const feeForTheGivenDates: number =
        Math.abs(+difference) * +baseFee.base_fee;

      const newReservation = await Reservation.create({
        reservation_id,
        placed_on: new Date().toISOString().split("T")[0],
        base_billing_value: feeForTheGivenDates,
        ...req.body,
      });
      req.body.reservation_id = reservation_id;
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          reservation_id: newReservation.reservation_id,
          email: newReservation.email,
          base_fee: feeForTheGivenDates,
        },
      });
      console.log("RESID:");
      // next();
    } catch (err) {
      logger.error("Err creating res:" + err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async customerCancelReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reservation_id = req.user.reservation_id;
      await Reservation.findOneAndUpdate(
        { reservation_id },
        { status: ReservationStatus.CANCELLED }
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async customerUpdateReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const reservation_id = req.user.reservation_id;
      const {
        arrival_date,
        departure_date,
        customer_address,
        customer_name,
        customer_contact_number,
      } = req.body;

      const difference = daysDifference(arrival_date, departure_date);
      const feeForTheGivenDates: number =
        +difference * +req.user.base_billing_value;

      const updated = await Reservation.findOneAndUpdate(
        {
          reservation_id,
        },
        {
          arrival_date,
          departure_date,
          customer_address,
          customer_name,
          customer_contact_number,
          base_billing_value: feeForTheGivenDates,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          updated,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async viewAllReservations(req: Request, res: Response, next: NextFunction) {
    try {
      const allReservations = await Reservation.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          list: allReservations,
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
