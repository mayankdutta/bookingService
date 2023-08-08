const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models/");
const { ValidationError, AppError } = require("../utils/errors");

class BookingRepository {
  constructor() {}

  async create(bookingPayload) {
    try {
      const booking = await Booking.create(bookingPayload);
      return booking;

    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "Cannot create booking",
        "There was some issue while creating booking, pls try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(bookingId, data) {
    try {

      const bookingObj = await Booking.findByPk(bookingId); 
      if (data.status) {
        bookingObj.status = data.status; 
      }

      await bookingObj.save();

      return bookingObj; 

      // await Booking.update(data, {
      //   where: {
      //     id: bookingId
      //   }
      // })
      // return true; 

    } catch (error) {

      console.log(error);
      throw new AppError(
        "Repository Error", 
        "Cannot update booking", 
        "There was some issue while updating booking, pls try again", 
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }
}

module.exports = BookingRepository;
