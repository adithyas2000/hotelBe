import { Request, Response, NextFunction, Router } from "express";
import { AuthenticationServices } from "../../service/auth/auth.service";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
const authRouter = Router();
const authServices = new AuthenticationServices();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();

authRouter.post(
  "/login",
  sanitize.sanitizeUserInputs,
  validate.userLoginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    authServices.login(req, res, next);
  }
);
authRouter.post(
  "/customer",
  sanitize.sanitizeUserInputs,
  validate.customerLoginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    authServices.customerLogin(req, res, next);
  }
);

authRouter.post(
  "/refresh-token",
  validate.refreshTokenValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    tokenService.refreshToken(req, res, next);
  }
);
authRouter.post(
  "/travel-company",
  sanitize.sanitizeUserInputs,
  validate.travelRegistrationValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    authServices.travelCompanyRegistration(req, res, next);
  }
);

export default authRouter;
