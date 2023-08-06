const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
  constructor(name, message, explanation, statusCode) {
    // might not be required.
    // super();

    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}
