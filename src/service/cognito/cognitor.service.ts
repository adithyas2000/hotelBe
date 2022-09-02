import { OAuthTokenServicesInterface } from "../../../types";
import { requiredScopes } from "express-oauth2-jwt-bearer";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import LoggerGlobal from "../../../logger/loggerSingelton";
const logger = LoggerGlobal.getInstance().logger;

export class OAuthTokenServices implements OAuthTokenServicesInterface {
  verifyAuthOToken = () => {
    const checkJwt = jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.COGNITO_JWKS_URI,
      }),
      issuer: process.env.AWS_TOKEN_ISSUER,
      algorithms: [process.env.ALGORITHM],
    });
    return checkJwt;
  };
  checkScopes = requiredScopes([process.env.AUTHO_SCOPE_CREATE]);
}
