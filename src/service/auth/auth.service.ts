import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
import { RegisteredUserType, RegisteredTravelUserType } from "../../../types";
import LoggerGlobal from "../../../logger/loggerSingelton";
import { TokenServices } from "../../service/token/token.service";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus, UserTypes } from "../../../enums/enums";
import { Admin } from "../../model/admin/admin";
import { Reservation } from "../../model/reservation/reservation";
import { TravelCompany } from "../../model/travelCompanies/travelCompanies";
import { Client } from "../../model/clients/client";
const clientAuth = new AWS.CognitoIdentityServiceProvider();

const logger = LoggerGlobal.getInstance().logger;
const tokenVerification = new TokenServices();

export class AuthenticationServices {
  private registeredUser = {} as RegisteredUserType;
  private registeredTravelUser = {} as RegisteredTravelUserType;

  async customerLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { reservation_id, email } = req.body;
      const reservation = await Reservation.findOne({
        $and: [{ reservation_id }, { email }],
      });

      if (!reservation)
        return next(errorResponseHandler(200, ErrorMessages.UNAUTHORIZED_USER));

      this.registeredUser._id = reservation_id;
      this.registeredUser.email = email;
      this.registeredUser.role = UserTypes.CUSTOMER;

      const token = await tokenVerification.signToken(
        this.registeredUser,
        next
      );
      const refreshToken = await tokenVerification.signRefreshToken(
        this.registeredUser,
        next
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        token,
        refreshToken,
        data: {
          reservation,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email }).select("+password").lean();
      this.registeredUser = admin;

      if (
        !this.registeredUser ||
        !(await bcrypt.compare(req.body.password, this.registeredUser.password))
      )
        return next(
          errorResponseHandler(400, ErrorMessages.INVALID_CREDENTIALS)
        );

      const token = await tokenVerification.signToken(
        this.registeredUser,
        next
      );
      const refreshToken = await tokenVerification.signRefreshToken(
        this.registeredUser,
        next
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        token,
        refreshToken,
        data: {
          user: {
            userRole: this.registeredUser.role,
          },
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async travelCompanyRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, name } = req.body;
      this.registeredTravelUser = await TravelCompany.findOne({
        email,
      });

      if (this.registeredTravelUser)
        return next(errorResponseHandler(400, ErrorMessages.USER_EXIST));
      const scopes = [process.env.AUTHO_SCOPE_CREATE];

      // use createuserPoolClient api to create a client in aws cognito user pool
      // this returns the client id and secret for the created user pool client
      const responseData = await clientAuth
        .createUserPoolClient({
          UserPoolId: process.env.USER_POOL_ID_1,
          ClientName: `${name}`,
          GenerateSecret: true,
          AllowedOAuthFlowsUserPoolClient: true,
          AllowedOAuthFlows: ["client_credentials"],
          AllowedOAuthScopes: scopes,
        })
        .promise();

      console.log(responseData);

      const travelCompany: any = await TravelCompany.create({
        email,
        name,
      });

      console.log(travelCompany);

      await Client.create({
        user_id: travelCompany._id.toString(),
        client_id: responseData.UserPoolClient.ClientId,
      });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          user: {
            name: name,
            client_id: responseData.UserPoolClient.ClientId,
            client_sercret: responseData.UserPoolClient.ClientSecret,
          },
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
}
