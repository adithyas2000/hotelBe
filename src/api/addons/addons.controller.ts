import { Request, Response, NextFunction, Router } from "express";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { AddOnsValidators } from "../../interceptors/addons.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AddOnsServices } from "../../service/addons/addons.service";
const addonRouter = Router();
const authUser = new AuthorizeUsersService();
const sanitize = new SanitizeInputs();
const validate = new AddOnsValidators();
const tokenService = new TokenServices();
const addon = new AddOnsServices();

addonRouter.post(
  "/:id",
  sanitize.sanitizeUserInputs,
  validate.addNewChargeValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleRegAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    addon.addNewCharge(req, res, next);
  }
);

export default addonRouter;
