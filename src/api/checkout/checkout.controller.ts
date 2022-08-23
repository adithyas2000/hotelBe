import { Request, Response, NextFunction, Router } from "express";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { CheckoutValidators } from "../../interceptors/checkout.interceptor";
import { CheckoutServices } from "../../service/checkout/checkout.service";
const checkoutRouter = Router();
const checkoutServices = new CheckoutServices();
const sanitize = new SanitizeInputs();
const validate = new CheckoutValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();

checkoutRouter.post(
  "/clerk",
  sanitize.sanitizeUserInputs,
  validate.webCheckoutValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    checkoutServices.checkOutCustomer(req, res, next);
  }
);

export default checkoutRouter;
