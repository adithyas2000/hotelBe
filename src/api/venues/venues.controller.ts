import { Request, Response, NextFunction, Router } from "express";
import { AuthorizeUsersService } from "../../service/authorizeUsers/authorizeUsers.service";
import { VenueServices } from "../../service/venue/venue.service";
import { SanitizeInputs } from "../../interceptors/sanitize.interceptor";
import { VenuesValidators } from "../../interceptors/venues.interceptor";
import { TokenServices } from "../../service/token/token.service";
const venueRouter = Router();
const sanitize = new SanitizeInputs();
const validate = new VenuesValidators();
const tokenService = new TokenServices();
const authUser = new AuthorizeUsersService();
const venueServices = new VenueServices();

venueRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.getAllVenues(req, res, next);
  }
);
venueRouter.get(
  "/hotel/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.getVenueById(req, res, next);
  }
);
venueRouter.get(
  "/rooms/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.getAllRoomsByVenueId(req, res, next);
  }
);
venueRouter.get(
  "/room/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.getroomByRoomTypeId(req, res, next);
  }
);

venueRouter.post(
  "/",
  sanitize.sanitizeUserInputs,
  validate.cerateANewVenueValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.createANewVenue(req, res, next);
  }
);
venueRouter.patch(
  "/hotel/:id",
  sanitize.sanitizeUserInputs,
  validate.updateVenueValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.updateVenue(req, res, next);
  }
);
venueRouter.patch(
  "/room/:id",
  sanitize.sanitizeUserInputs,
  validate.updateRoomValidator,
  tokenService.verifyUser,
  authUser.checkUserRoleSuperAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    venueServices.updateRoom(req, res, next);
  }
);

export default venueRouter;
