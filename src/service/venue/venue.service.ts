import { Request, Response, NextFunction } from "express";
import { customAlphabet } from "nanoid";
import LoggerGlobal from "../../../logger/loggerSingelton";
import errorResponseHandler from "../../../utils/errorResponseHandler";
import { ErrorMessages, ResponseStatus } from "../../../enums/enums";
import { Venue } from "../../model/venues/venues";
import { HotelRoom } from "../../model/hotelRooms/hotelRooms";
const logger = LoggerGlobal.getInstance().logger;

export class VenueServices {
  private nanoid = customAlphabet("1234567890ABCDFGHIJKLMNOPQRSTUVWXY", 8);

  async createANewVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const venue_id = `venue-${this.nanoid()}`;
      var room_type_id="";
      const {
        venue_name,
        venue_address,
        venue_city,
        venue_contact_number,
        rooms,
      } = req.body;
      if(rooms[0].room_type=="suit"){
         room_type_id = `suit-type-${this.nanoid()}`;
      }else{
         room_type_id = `room-type-${this.nanoid()}`;
      }
      

      await Venue.create({
        venue_id,
        venue_name,
        venue_address,
        venue_city,
        venue_contact_number,
      });

      for (const room of rooms) {
        await HotelRoom.create({
          room_type_id,
          hotel_id: venue_id,
          room_type: room.room_type,
          max_no_of_occupants: room.max_no_of_occupants,
          no_of_rooms: room.no_of_rooms,
          base_fee: room.base_fee,
        });
      }

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const venue_id = req.params.id;

      const { venue_name, venue_address, venue_city, venue_contact_number } =
        req.body;

      await Venue.findOneAndUpdate(
        { venue_id },
        {
          venue_name,
          venue_address,
          venue_city,
          venue_contact_number,
        }
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      const room_type_id = req.params.id;

      const { room_type, max_no_of_occupants, no_of_rooms, base_fee } =
        req.body;

      await HotelRoom.findOneAndUpdate(
        { room_type_id },
        {
          room_type,
          max_no_of_occupants,
          no_of_rooms,
          base_fee,
        }
      );

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getAllVenues(req: Request, res: Response, next: NextFunction) {
    try {
      const venues = await Venue.find();

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          venues,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getVenueById(req: Request, res: Response, next: NextFunction) {
    try {
      const venue_id = req.params.id;
      const venue = await Venue.findOne({ venue_id });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          venue,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getAllRoomsByVenueId(req: Request, res: Response, next: NextFunction) {
    try {
      const hotel_id = req.params.id;
      const rooms = await HotelRoom.find({ hotel_id });

      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          rooms,
        },
      });
    } catch (err) {
      logger.error(err.message);

      return next(
        errorResponseHandler(500, ErrorMessages.INTERNAL_SERVER_ERROR)
      );
    }
  }
  async getroomByRoomTypeId(req: Request, res: Response, next: NextFunction) {
    try {
      const room_type_id = req.params.id;
      const room = await HotelRoom.findOne({ room_type_id });
      res.status(200).json({
        status: ResponseStatus.SUCCESS,
        data: {
          room,
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
