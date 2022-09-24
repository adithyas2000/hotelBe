import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { ReservationValidators } from "../../interceptors/reservation.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { ReservationServices } from "../../service/reservation/reservation.service";
import { OAuthTokenServices } from "../../service/cognito/cognitor.service";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import jwtAuthz from "express-jwt-authz";
const reservationRouter = Router();
const reservationServices = new ReservationServices();
const sanitize = new SanitizeInputs();
const validate = new ReservationValidators();
const verify = new TokenServices();
const auth = new AuthorizeUsersService();
const cognito = new OAuthTokenServices();

reservationRouter.post(
  "/travel-companies",
  cognito.verifyAuthOToken(),
  jwtAuthz([process.env.AUTHO_SCOPE_CREATE]),
  sanitize.sanitizeUserInputs,
  validate.travelCompaniesReservationValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.createANewReservation(req, res, next);
  }
);
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
    reservationServices.createANewReservation(req, res, next);
  }
);
reservationRouter.get(
  "/view-all",
  verify.verifyUser,
  auth.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    reservationServices.viewAllReservations(req, res, next);
  }
);

export default reservationRouter;
