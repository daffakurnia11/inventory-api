class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

class AuthenticationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export { BadRequestError, AuthenticationError };
