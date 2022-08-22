import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { CheckinServices } from "../../service/checkin/checkin.service";
import { CheckinValidators } from "../../interceptors/checkin.interceptor";
const checkinRouter = Router();
const checkinServices = new CheckinServices();
const sanitize = new SanitizeInputs();
const validate = new CheckinValidators();

checkinRouter.post(
  "/clerk",
  sanitize.sanitizeUserInputs,
  validate.webCheckinValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    checkinServices.checkInCustomer(req, res, next);
  }
);

export default checkinRouter;
