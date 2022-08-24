import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { CheckinServices } from "../../service/checkin/checkin.service";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { CheckinValidators } from "../../interceptors/checkin.interceptor";
import { ReservationServices } from "../../service/reservation/reservation.service";
const checkinRouter = Router();
const checkinServices = new CheckinServices();
const reservationServices=new ReservationServices();
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

checkinRouter.post(
  "/clerk_nores",
  sanitize.sanitizeUserInputs,
  // validate.webCheckinValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    // checkinServices.checkinCustomerWithoutReservation(req, res, next);
    reservationServices.createANewReservation(req,res,next),
    checkinServices.checkInCustomerWithoutPriorReservation(req,res,next);
  }
);

export default checkinRouter;
