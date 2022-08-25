import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { ReservationValidators } from "../../interceptors/reservation.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { ReservationServices } from "../../service/reservation/reservation.service";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
const reservationRouter = Router();
const reservationServices = new ReservationServices();
const sanitize = new SanitizeInputs();
const validate = new ReservationValidators();
const verify = new TokenServices();
const auth = new AuthorizeUsersService();

reservationRouter.post(
  "/customer",
  sanitize.sanitizeUserInputs,
  validate.webReservationValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.createANewReservation(req, res, next);
  }
);
reservationRouter.patch(
  "/customer",
  sanitize.sanitizeUserInputs,
  validate.webReservationUpdateValidator,
  verify.verifyCustomerReservation,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.customerUpdateReservation(req, res, next);
  }
);

reservationRouter.get(
  "/cancel",
  sanitize.sanitizeUserInputs,
  validate.webReservationValidator,
  verify.verifyCustomerReservation,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.customerCancelReservation(req, res, next);
  }
);

reservationRouter.post(
  "/cleark",
  sanitize.sanitizeUserInputs,
  validate.webReservationValidator,
  verify.verifyUser,
  auth.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.createANewReservation(req, res, next);
  }
);

reservationRouter.post(
  "/clerk/suit",
  sanitize.sanitizeUserInputs,
  validate.webReservationValidator,
  verify.verifyUser,
  auth.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.room.room_type_id)
    // req.body.room.room_type_id
    // reservationServices.createANewReservation(req, res, next);
  }
);

export default reservationRouter;
