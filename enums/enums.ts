export enum UserTypes {
  ECOM = "ecom",
  COURIER = "courier",
  MARKETPLACE = "marketplace",
  ADMIN = "admin",
}

export enum PaymentsCategory {
  RECEIVABLE = "receivable",
  PAYABLE = "payable",
}

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export enum AccountStatus {
  ACTIVE = "active",
  LOCKED = "locked",
}

export enum RegistrationStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export enum ResponseStatus {
  SUCCESS = "Success",
  FAILED = "Failed",
}

export enum ServiceAssignMode {
  AUTOMATED = "automated",
  MANUAL = "manual",
}

export enum RequiredFieldMessages {
  USERID_REQUIRED = "Please provide the userid",
  CONTACT_NUMBER_REQUIRED = "Please provide the contact number",
  ORDER_PLACING_MODE_REQUIRED = "Please provide the order placing mode",
  ADDRESS_REQUIRED = "Please provide the address",
  ECOM_VENDORS_REQUIRED = "Please provide the ecom vendors",
  PICKUP_TIME_REQUIRED = "Pickup time is required",
  NAME_REQUIRED = "Please provide the name",
  EMAIL_REQUIRED = "Please provide the email address",
  PASSWORD_REQUIRED = "Please provide a valid password",
  USER_TYPE_REQUIRED = "Please provide the user type",
  PROVIDE_COURIERS = "Please provide the couries",
  MARKETPLACE_USERID_REQUIRED = "Please provide the market place user id",
  MARKETPLACE_ID_REQUIRED = "Please provide the market place id",
  CITY_REQUIRED = "Please provide the city",
  WAYBILL_NUMBER_REQUIRED = "Waybill number is required",
  RECEIVER_NAME_REQUIRED = "Receiver name is required",
  RECEIVER_PHONE_REQUIRED = "Receiver phone is required",
  RECEIVER_ADDRESS_REQUIRED = "Receiver address is required",
  RECEIVER_CITY_REQUIRED = "Receiver city is required",
  RECEIEVER_EMAIL_REQUIRED = "Receiver email is required",
  ORDER_WEIGHT_REQUIRED = "Order weight is required",
  ORDER_TOTAL_REQUIRED = "Order total is required",
}

export enum ErrorMessages {
  CLIENT_ID_NOT_FOUND = "Client ID not found",
  INVALID_REQUEST = "Invalid Request",
  ORDER_STATUS_NOT_CHANGED = "Order status not changed",
  ORDER_HAS_BEEN_DELIVERED = "Order has been delivered",
  INVOICES_NOT_FOUND = "Invoices not found",
  INVALID_USER_ID = "Invalid user id",
  USER_DOES_NOT_EXIST = "User does not exist",
  USER_EXIST = "User already exist!",
  EMPTY_INPUT_FIELDS = "please fill all the input fields",
  INVALID_CREDENTIALS = "Invalid user name or password",
  REQUEST_TO_LOGIN = "Please login to continue!!",
  ACCOUNT_IS_BLOCKED = "Your account is temp blocked",
  REGISTRATION_STATUS_IS_PENDING = "your account is not yet approved",
  ALREADY_REGISTERED = "User has already registered",
  INVALID_PASSWORD = "Invalid current password",
  INVALID_TOKEN = "Unauthorized access",
  UNAUTHORIZED_USER = "Unauthorized user",
  TOKEN_EXPIRED = "Token expired",
  INTERNAL_SERVER_ERROR = "Internal server error",
  NO_ORDERS_FOUND = "no orders found",
  INVALID_ORDER_ID = "Invalid order id",
  INVALID_PARAMETERS = "Invalid parameters",
  FILE_UPLOADED = "file has already uploaded",
  INVALID_TRACKING_ID = "Invalid tracking id",
  INVALID_ORDER_STATUS = "Invalid order status",
  TRACKING_NUMBER_HAS_UPDATED = "Tracking number has updated already",
  NO_AVAILABLE_COURIERS = "No courier service available for the delivery city. Assign a courier service manually",
  INVALID_LOCATION = "Invalid pickup or delivery point",
  FILE_DELETED = "File deleted successfully",
  FILE_NOT_DELETED = "Error deleting file",
}

export enum OrderPaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
}

export enum OrderPaymentMethod {
  COD = "cod",
  ONLINE = "online",
}

export enum OrderStatus {
  PICKEDUP = "pickedup",
  INTRANSITION = "intransit",
  RETURN = "return",
  DELIVERED = "delivered",
  PENDING = "pending",
  ASSIGNED = "assigned",
  PROCESSING = "processing",
  PLACED = "placed",
  SHIPPED = "shipped",
  CANCELLED = "cancelled",
}

export enum OrderPlacingMode {
  SCHEDULED = "scheduled",
  SINGLE = "single",
}

export enum EndUserEmail {
  SUBJECT = "Order delivery Confirmation",
  MESSAGE = "Your order has been placed successfully and will be delivered to you soon. Please find below tracking URL for your order",
}
export enum EcomUserEmail {
  SUBJECT = "Order delivery Confirmation",
  MESSAGE_LINE1 = "Your order has been placed successfully and will be delivered to you soon. Please find below tracking URL for your order",
  MESSAGE_LINE2 = "Tracking Number: ",
}
export enum RejectUserEmail {
  SUBJECT = "Rejected",
  MESSAGE_LINE1 = "Your request to register to our service has been rejected",
}
export enum ApprovedUserEmail {
  SUBJECT = "Approved",
  MESSAGE_LINE1 = "Your request to register to our service has been approved",
}

export enum LabelContent {
  ECOM = "e commerce service",
  PICKUP_LOCATION = "pickup location",
  CUSTOMER_NAME = "customer name",
  CUSTOMER_ADDRESS = "customer address",
  CUSTOMER_EMAIL = "customer email",
  CUSTOMER_CONTACT_NUMBER = "customer contact number",
  PAYMENT_METHOD = "payment method",
  TOTAL = "payment",
  PAYMENT_COMPLETED = "payment completed",
}

export enum InventoryKeys {
  ITEM_NAME = "itemName",
  STANDARD = "standard",
}
export enum PriceKeys {
  PRICE = "price",
  STANDARD_C = "standard",
  DISTANCE = "distance",
}
export enum TrackingMessages {
  ORDER_PROCESSING = "Order is currently processing",
  ORDER_PLACED = "Order has been placed",
}

export enum SuccessMessages {
  FILE_UPLOADED_SUCCESS = "File uploaded successfully",
}

export enum NoDataMessages {
  FILE_UPLOADED_NO_DATA = "File uploaded has no data available",
}

export enum FlaggedOrders {
  ORDER_FLAGGED = "Orders has been flagged successfully",
}

export enum ExcelImportedOrders {
  BATCH_WRITE_TEMPORDER_TO_ORDER = "Batch write from TempOrders to Orders successful",
}

export enum Cron {
  FORTNIGHT = "30 1 1,15 * *",
  // the day of the week needs to be updated accordin to the starting date of the platform
  WEEKLY = "30 1 8,22 * *",
  DAILY_FLAG_CHECK = "0 8 * * *",
  EVERY_THURSDAY = "40 20,12,18 * * *",
  TEMPORDER_TO_ORDER_BATCH_WRITE = "00 08,12,18 * * *",
}
export enum InvoicingMessages {
  TIME_GENERATED = "Invoices time period generated successfully",
  INVOICES_GENERATED = "Invoices generated successfully",
  PAYMENTS_UPDATED = "Payments table updated successfully for invoicing",
}
