import { Request, Response, NextFunction, Router } from "express";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { UserInputValidators } from "../../interceptors/validator.interceptor";
import { TokenServices } from "../../service/token/token.service";
import { AdminServices } from "../../service/admin/admin.service";
const adminRouter = Router();
const authUser = new AuthorizeUsersService();
const sanitize = new SanitizeInputs();
const validate = new UserInputValidators();
const tokenService = new TokenServices();
const admin = new AdminServices();

adminRouter.get(
  "/",
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    admin.getAllAdmin(req, res, next);
  }
);
adminRouter.post(
  "/",
  sanitize.sanitizeUserInputs,
  validate.newAdminValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    admin.createNewAdmin(req, res, next);
  }
);

adminRouter.delete(
  "/:id",
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    admin.removeAdmin(req, res, next);
  }
);

export default adminRouter;
