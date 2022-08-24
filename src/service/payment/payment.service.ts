import { Request, Response, NextFunction } from "express";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import {
  ErrorMessages,
  ResponseStatus,
  ReservationStatus,
} from "../../../enums/enums";
import { Payment } from "../../model/payment/payments";
import { Reservation } from "../../model/reservation/reservation";
import { func } from "joi";
import Stripe from "stripe";
const str = new Stripe(process.env.STRIPE_SECRET, null);
const logger = LoggerGlobal.getInstance().logger;
export class PaymentServices {
  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const checkReservation = Reservation.findOne({
        reservation_id: req.body.reservation_id,
      })
        .lean()
        .exec(async function (err, check_res) {
          if (check_res) {
            var newPayDetails = new Payment();
            newPayDetails = {
              ...req.body,
              fee_for_the_period: check_res.base_billing_value,
            };
            const stripeItemArray = [
              {
                price_data: {
                  currency: "lkr",
                  product_data: {
                    name: "Base charge",
                  },
                  unit_amount: newPayDetails.fee_for_the_period * 100,
                },
                quantity: 1,
              },
              {
                price_data: {
                  currency: "lkr",
                  product_data: {
                    name: "Charge for additional nights",
                  },
                  unit_amount:
                    (newPayDetails.fee_for_additional_nights /
                      newPayDetails.no_of_additional_nights) *
                    100,
                },
                quantity: newPayDetails.no_of_additional_nights,
              },
              // {
              //     price_data:{
              //         currency:'usd',
              //         product_data:{
              //             name:'Optional charges'
              //         },
              //         unit_amount:newPayDetails.optional_charges
              //     },
              //     quantity:1
              // },
            ];
            const session = await str.checkout.sessions.create({
              line_items: [
                ...stripeItemArray,
                // {
                //     price_data: {
                //         currency: 'usd',
                //         product_data: {
                //             name: 'T-shirt',
                //         },
                //         unit_amount: 2000,
                //     },
                //     quantity: 1,
                // },
              ],
              mode: "payment",
              success_url: "http://www.success",
              cancel_url: "http://www.cancel",
            });
            //record payment to db
            const newPayment = await Payment.create({
              ...req.body,
              fee_for_the_period: check_res.base_billing_value,
              total_charged:
                check_res.base_billing_value +
                req.body.fee_for_additional_nights,
            });
            //Uncomment this and comment redirect to get url in response

            res.status(200).json({
              status: ResponseStatus.SUCCESS,
              data: {
                ...req.body,
                paymentURL: session.url,
              },
            });

            // res.redirect(session.url);
          }
        });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
