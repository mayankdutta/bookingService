const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
  constructor(
    name,
    message = "something went wrong in service layer",
    explanation = "service layer error",
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    // may be not here.
    super();

    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}

module.exports = ServiceError;
