import winston from "winston";

class LoggerGlobal {
  private readonly _logger: winston.Logger;

  private static _instance: LoggerGlobal;

  private constructor() {
    this._logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "./logs/combined.log",
          level: "info",
        }),
      ],
    });
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new LoggerGlobal();
    return this._instance;
  }

  public get logger() {
    return this._logger;
  }
}

export default LoggerGlobal;
