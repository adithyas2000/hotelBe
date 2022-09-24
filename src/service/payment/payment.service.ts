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
import { any, func } from "joi";
import Stripe from "stripe";
const str = new Stripe(process.env.STRIPE_SECRET, null);
const logger = LoggerGlobal.getInstance().logger;
export class PaymentServices {

  async createPayment(req: Request, res: Response, next: NextFunction) {
    try {
      console.log({ ...req.body });
      const checkReservation = Reservation.findOne({ reservation_id: req.body.reservation_id }).lean().exec(async function (err, check_res) {
        if (check_res) {

          //record payment to db
          const newPayment = await Payment.create(
            {
              ...req.body,
              fee_for_the_period: check_res.base_billing_value,
              total_charged: (check_res.base_billing_value + req.body.fee_for_additional_nights)
            }

          );
          //Uncomment this and comment redirect to get url in response
          if (req.body.base_billing_value) {
            res.status(200).json({
              status: ResponseStatus.SUCCESS,
              data: {
                ...req.body
              }
            });
          }

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

  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const getPayment = Payment.findOne({ reservation_id: req.body.reservation_id }).lean().exec(async function (err, pay_resp) {
        if(!pay_resp){
          return next(
            errorResponseHandler(500, ErrorMessages.EMPTY_INPUT_FIELDS)
          );
        }

        console.log(pay_resp);
        // var newPayDetails = new Payment;
        const newPayDetails = { ...pay_resp }
        const optionalCharges = pay_resp.optional_charges;
        // console.log(optionalCharges[0].addon_name);

        const stripeItemArray = [
          {
            price_data: {
              currency: 'lkr',
              product_data: {
                name: 'Base charge'
              },
              unit_amount: newPayDetails.fee_for_the_period * 100
            },
            quantity: 1
          },
          {
            price_data: {
              currency: 'lkr',
              product_data: {
                name: 'Charge for additional nights'
              },
              unit_amount: (newPayDetails.fee_for_additional_nights / newPayDetails.no_of_additional_nights * 100)
            },
            quantity: newPayDetails.no_of_additional_nights
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
        // console.log("Opt charges:"+newPayDetails.optional_charges);
        optionalCharges.forEach((item: any) => {
          console.log("Opt charges:" + item.addon_name);
          var optionalCharge = {
            price_data: {
              currency: 'lkr',
              product_data: {
                name: item.addon_name
              },
              unit_amount: item.charge * 100
            },
            quantity: 1
          }
          stripeItemArray.push(optionalCharge);
        });
        const session = await str.checkout.sessions.create({
          line_items: [
            ...stripeItemArray
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
          mode: 'payment',
          success_url: 'http://www.success',
          cancel_url: 'http://www.cancel',
        });
        res.status(200).json({
          status: ResponseStatus.SUCCESS,
          data: {
            "URL": session.url
          }
        });
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

}
