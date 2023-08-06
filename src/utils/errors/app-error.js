const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(name, message, explanation, statusCode) {
    // may be not here.
    // super();

    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}
