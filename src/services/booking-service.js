const { FLIGHT_SERVICE_PATH } = require("../config/configServer");
const BookingRepository = require("../repository/booking-repository");
const axios = require("axios");
const { ServiceError } = require("../utils/errors");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    /**
     * will have
     * @param {flightId, userId, noOfSeats}
     * data will be commming from frontend.
     */
    try {
      const flightId = data.flightId;

      console.log("> fetching data");
      const flight = await axios.get(
        `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`,
      );
      // axios gives API response in data property,
      // and we have also put our data in data property only, hene 2 'data'

      const flightData = flight.data.data;
      let priceOfTheFlight = flightData.price;

      if (flightData.totalSeats < data.noOfSeats) {
        throw new ServiceError(
          "something went wrong in booking process",
          "Seats Insufficient to proceed further. ",
        );
      }

      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayload = { ...data, totalCost };

      console.log("> processing data");
      const booking = await this.bookingRepository.create(bookingPayload);

      // AFTER making successfull booking, we will have to update the flight data, by the seats.

      console.log("> making another call");

      await axios.patch(
        `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`,
        {
          totalSeats: flightData.totalSeats - booking.noOfSeats,
        },
      );

      // NEEd to update the status of booking obj.

      console.log("> making yet another call");

      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      return finalBooking;

      // return flight.data.data;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        // no need to make new service layer, this error should only be come from repo layer.
        throw error;
      }

      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
