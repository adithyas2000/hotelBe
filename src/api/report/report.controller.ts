import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { ReportServices } from "../../service/reports/reports.service";
import { PaymentValidators } from "../../interceptors/payment.interceptor";
import { TokenServices } from "../../service/token/token.service";
const reportRouter = Router();
const reportService=new ReportServices();
const sanitize = new SanitizeInputs();
const tokenService=new TokenServices();

reportRouter.post(
  "/getRevenueReportForDate",
  sanitize.sanitizeUserInputs,
  tokenService.verifyUser,
  async (req: Request, res: Response, next: NextFunction) => {
    reportService.getRevenueReportForDate(req,res,next);
  }
);

reportRouter.post(
    "/getRevenueReportForMonth",
    sanitize.sanitizeUserInputs,
    tokenService.verifyUser,
    async (req: Request, res: Response, next: NextFunction) => {
      reportService.getRevenueReportForMonth(req,res,next);
    }
  );

export default reportRouter;
