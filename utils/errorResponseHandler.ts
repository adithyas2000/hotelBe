import { Error } from "../types";

const errorResponseHandler = (statusCode: number, message: string) => {
  const status: string = `${statusCode}`.startsWith("4") ? "failed" : "error";

  const err: Error = {
    statusCode,
    status,
    message,
  };

  return err;
};

export default errorResponseHandler;
