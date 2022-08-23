import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { PaymentServices } from "../../service/payment/payment.service";
import { PaymentValidators } from "../../interceptors/payment.interceptor";
const paymentRouter = Router();
const paymentServices=new PaymentServices();
const sanitize = new SanitizeInputs();
const validate = new PaymentValidators();

paymentRouter.post(
  "/customer",
  sanitize.sanitizeUserInputs,
  validate.validatePayment,
  async (req: Request, res: Response, next: NextFunction) => {
    paymentServices.makePayment(req,res,next);
  }
);

export default paymentRouter;
