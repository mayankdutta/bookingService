const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/");

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/configServer");

const bookingService = new BookingService();

class BookingController {
  constructor(channel) {}

  async sendMessageToQueue(req, res) {
    console.log("i am here");
    const channel = await createChannel();

    const payload = {
      data: {
        subject: "This is a notification from queue",
        content: "some queue will subscribe this.",
        recepientEmail: "smayankdutt@gmail.com",
        notificationTime: "2023-01-08 09:49:00",
      },
      service: "CREATE_TICKET",
    };

    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));

    return res.status(200).json({
      message: "successfully published the message",
    });
  }

  async create(req, res) {
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
  }
}

module.exports = BookingController;
