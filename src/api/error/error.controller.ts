import { Request, Response, NextFunction } from "express";
import { GlobalErroHandlerInterface } from "../../../types";

const globalErrorHandler: GlobalErroHandlerInterface = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalErrorHandler;
