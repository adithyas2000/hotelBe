import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus,ReservationStatus } from "../../../enums/enums";
import { Reservation } from "../../model/reservation/reservation";
import { ReservationServices } from "../../service/reservation/reservation.service";
const logger = LoggerGlobal.getInstance().logger;
const reservationServices=new ReservationServices();
export class CheckinServices {
    async checkInCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const getcustomer = Reservation.findOne({ reservation_id: req.body.reservation_id }).lean().exec(function (err, resp) {
                if (resp) {
                    const updateCustomer = Reservation.findOneAndUpdate({ reservation_id: resp.reservation_id }, { arrival_date: req.body.arrival_date,status:ReservationStatus.CHECKED_IN }).lean().exec(function (err, update_res) {
                        res.status(200).json({
                            status: ResponseStatus.SUCCESS,
                            data: {
                                ...update_res
                            },
                        });
                    });

                }else{
                    reservationServices.createANewReservation(req,res,next);
                }

            });
            //   const customerCheckin = await Checkin.findOneAndUpdate({reservation_id:req.body.reservation_id},{arrival_date:req.body.arrival_date})

        } catch (err) {
            logger.error(err.message);

            return next(
                errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
            );
        }
    }
}
