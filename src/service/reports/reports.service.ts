import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus,ReservationStatus } from "../../../enums/enums";
import { Revenue } from "../../model/revenue/revenue";
const logger = LoggerGlobal.getInstance().logger;
export class ReportServices {
    async getRevenueReportForDate(req: Request, res: Response, next: NextFunction) {
        try {
            
            const getRevenue=Revenue.findOne({revenue_date:req.body.revenue_date}).lean().exec(function(err,rev_res){
                console.log("Found rev report with id: "+rev_res._id);
                res.status(200).json(
                    {...rev_res}
                )
            });

        } catch (err) {
            logger.error(err.message);

            return next(
                errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
            );
        }
    }

    async getRevenueReportForMonth(req: Request, res: Response, next: NextFunction) {
        const month:number=req.body.revenue_month;
        const year:number=req.body.revenue_year;
        // const monthRegex=/[0-9]*\-12*\-[0-9]*/
        const regexStr:string=year+"*\-"+month+"*\-[0-9]*";
        const monthRegex= new RegExp(regexStr);
        try {
            console.log("Regex:"+monthRegex,'g');
            const getRevenue=Revenue.find({revenue_date:{$regex:monthRegex}}).lean().exec(function(err,rev_res){
                var monthlyRev:number=0;
                var monthlyOccupants:number=0;
                // console.log("Found rev report with id: "+rev_res[0]._id);
                for (var item of rev_res){
                    monthlyRev+=item.revenue;
                    monthlyOccupants+=item.total_occupancy;
                }
                res.status(200).json(
                    {
                        "revenue_month":month,
                        "revenue_year":year,
                        "total_revenue":monthlyRev,
                        "total_occupants":monthlyOccupants

                    }
                )
            });

        } catch (err) {
            logger.error(err.message);

            return next(
                errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
            );
        }
    }
}
