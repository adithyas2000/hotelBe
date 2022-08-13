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
