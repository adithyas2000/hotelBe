export enum UserTypes {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
}

export enum ResponseStatus {
  SUCCESS = "Success",
  FAILED = "Failed",
}

export enum RequiredFieldMessages {
  CONTACT_NUMBER_REQUIRED = "Please provide the contact number",
  ADDRESS_REQUIRED = "Please provide the address",
  EMAIL_REQUIRED = "Please provide the email address",
  PASSWORD_REQUIRED = "Please provide a valid password",
  USER_TYPE_REQUIRED = "Please provide the user type",
}
export enum ErrorMessages {
  INVALID_REQUEST = "Invalid Request",
  USER_DOES_NOT_EXIST = "User does not exist",
  USER_EXIST = "User already exist!",
  EMPTY_INPUT_FIELDS = "please fill all the input fields",
  INVALID_CREDENTIALS = "Invalid user name or password",
  REQUEST_TO_LOGIN = "Please login to continue!!",
  ALREADY_REGISTERED = "User has already registered",
  INVALID_PASSWORD = "Invalid current password",
  INVALID_TOKEN = "Unauthorized access",
  UNAUTHORIZED_USER = "Unauthorized user",
  TOKEN_EXPIRED = "Token expired",
  INTERNAL_SERVER_ERROR = "Internal server error",
  INVALID_PARAMETERS = "Invalid parameters",
  FILE_NOT_DELETED = "Error deleting file",
}
