import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}
export type Error = {
  statusCode: number;
  status: string;
  message: string;
};

export interface GlobalErroHandlerInterface {
  (err: any, req: Request, res: Response, next: NextFunction): void;
}

export type RegisteredUserType = {
  _id?: object;
  email: string;
  password: string;
  role: string;
};

export interface TokenServicesInterface {
  verifyUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | void>;
  refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<NextFunction | void>;
  signRefreshToken(
    user: RegisteredUserType,
    next: NextFunction
  ): Promise<NextFunction | string>;
  signToken(
    user: RegisteredUserType,
    next: NextFunction
  ): Promise<NextFunction | string>;
}
