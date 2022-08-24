import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import {
  ErrorMessages,
  ResponseStatus,
  ReservationStatus,
} from "../../../enums/enums";
import { Reservation } from "../../model/reservation/reservation";
import { ReservationServices } from "../../service/reservation/reservation.service";
import { Customer } from "../../model/customers/customer";
import { PaymentServices } from "../../service/payment/payment.service";
const paymentServices=new PaymentServices();
const logger = LoggerGlobal.getInstance().logger;
const reservationServices = new ReservationServices();
export class CheckinServices {
  async checkInCustomerWithoutPriorReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const getcustomer = Reservation.findOne({
        reservation_id: req.body.reservation_id,
      })
        .lean()
        .exec(async function (err, resp) {
          const updateCustomer = Reservation.findOneAndUpdate(
            { reservation_id: req.body.reservation_id },
            {
              arrival_date: req.body.arrival_date,
              status: ReservationStatus.CHECKED_IN,
            }
          )
            .lean()
            .exec(async function (err, update_res) {

              const newCustomer = await Customer.create({
                reservation_id: req.body.reservation_id,
                room_number: req.body.room_number
              });
              console.log("resp.base:"+resp.base_billing_value);
              req.body.fee_for_the_period=resp.base_billing_value;
              paymentServices.createPayment(req,res,next);
            });

        });
      // create a customer record

      //   const customerCheckin = await Checkin.findOneAndUpdate({reservation_id:req.body.reservation_id},{arrival_date:req.body.arrival_date})
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async checkInCustomerWithPriorReservation(req: Request, res: Response, next: NextFunction) {
    this.checkInCustomerWithoutPriorReservation(req, res, next),
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          ...req.body,
        },
      });
  }
}