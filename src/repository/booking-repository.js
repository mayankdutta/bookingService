const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models/booking");
const { ValidationError, AppError } = require("../utils/errors");

class BookingRepository {
  constructor() {}

  async create() {
    try {
      const booking = await Booking.create();
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
}

module.exports = BookingRepository;
