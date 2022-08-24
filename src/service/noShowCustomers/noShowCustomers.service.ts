import LoggerGlobal from "../../../logger/loggerSingelton";
import { ReservationStatus } from "../../../enums/enums";
import { Reservation } from "../../model/reservation/reservation";
import { Payment } from "../../model/payment/payments";

import { Revenue } from "../../model/revenue/revenue";
const logger = LoggerGlobal.getInstance().logger;

export class NoShowCustomersServices {
  async noshowBillingCreation() {
    try {
      const date = new Date().toISOString().split("T")[0];
      await Reservation.updateMany(
        {
          arrival_date: date,
          status: ReservationStatus.RESERVED,
        },

        {
          $set: {
            status: ReservationStatus.NO_SHOW,
          },
        }
      );

      const allNoShowReservations = await Reservation.find({
        $and: [{ arrival_date: date }, { status: ReservationStatus.NO_SHOW }],
      });

      for (const reservation of allNoShowReservations) {
        await Payment.create({
          reservation_id: reservation.reservation_id,
          total_charged: reservation.base_billing_value,
          fee_for_the_period: reservation.base_billing_value,
        });
      }

      logger.info("successfully generatedno show billing ");
    } catch (err) {
      logger.error(err.message);
    }
  }

  async revenueRecordCreationForThePreviousDate() {
    try {
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      let numberOfOccupants = 0;
      let revenue = 0;

      const allReservations = await Reservation.find({
        $and: [
          { departure_date: yesterday },
          { status: ReservationStatus.CHECKED_OUT },
        ],
      });

      for (const reservation of allReservations) {
        numberOfOccupants += reservation.room.no_of_occupants;

        const billing = await Payment.findOne({
          reservation_id: reservation.reservation_id,
        });
        revenue += +billing.total_charged;
      }

      await Revenue.create({
        revenue_date: yesterday,
        total_occupancy: numberOfOccupants,
        revenue,
      });

      logger.info("revenue created");
    } catch (err) {
      logger.error(err.message);
    }
  }
}
