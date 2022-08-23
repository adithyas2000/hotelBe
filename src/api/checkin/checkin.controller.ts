import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { CheckinServices } from "../../service/checkin/checkin.service";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { CheckinValidators } from "../../interceptors/checkin.interceptor";
const checkinRouter = Router();
const checkinServices = new CheckinServices();
const sanitize = new SanitizeInputs();
const validate = new CheckinValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

checkinRouter.post(
  "/clerk",
  sanitize.sanitizeUserInputs,
  validate.webCheckinValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    checkinServices.checkInCustomerWithPriorReservation(req, res, next);
  }
);

export default checkinRouter;
