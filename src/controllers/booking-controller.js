const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/");

const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log(" >>>>>>>>> after executing successfully: ", response);
    return res.status(StatusCodes.OK).json({
      data: response,
      message: "Successfully completed booking",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error); 
    return res.status(error.statusCode).json({
      data: {},
      message: error.message,
      success: false,
      err: error.explanation,
    });
  }
};

module.exports = { create };
