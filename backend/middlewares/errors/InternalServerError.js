class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = InternalServerError;
