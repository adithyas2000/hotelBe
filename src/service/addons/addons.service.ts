import { Request, Response, NextFunction } from "express";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { Payment } from "../../model/payment/payments";
const logger = LoggerGlobal.getInstance().logger;

export class AddOnsServices {
  async addNewCharge(req: Request, res: Response, next: NextFunction) {
    try {
      const reservation_id = req.params.id;
      const { addonName, charge } = req.body;

      await Payment.findOneAndUpdate(
        {
          reservation_id,
        },
        {
          $push: {
            optional_charges: {
              $each: [{ addon_name: addonName, charge: charge }],
            },
          },
        }
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
}
