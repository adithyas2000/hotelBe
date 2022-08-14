import { Request, Response, NextFunction } from "express";
import errorResponseHandler from "../../utils/errorResponseHandler";
import LoggerGlobal from "../../logger/loggerSingelton";
import sanitizeUserInputs from "../../utils/sanitizeInputs";
import { ErrorMessages } from "../../enums/enums";

const logger = LoggerGlobal.getInstance().logger;

export class SanitizeInputs {
  async sanitizeUserInputs(req: Request, res: Response, next: NextFunction) {
    try {
      const sanitizedOrders = sanitizeUserInputs(req.body);
      req.body = sanitizedOrders;
      next();
    } catch (err) {
      logger.error(err.message);
      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
