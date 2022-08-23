import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { ReservationValidators } from "../../interceptors/reservation.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { ReservationServices } from "../../service/reservation/reservation.service";
const reservationRouter = Router();
const reservationServices = new ReservationServices();
const sanitize = new SanitizeInputs();
const validate = new ReservationValidators();

reservationRouter.post(
  "/",
  sanitize.sanitizeUserInputs,
  validate.webReservationValidator,
  async (req: Request, res: Response, next: NextFunction) => {}
);

export default reservationRouter;
