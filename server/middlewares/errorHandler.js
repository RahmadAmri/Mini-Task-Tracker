const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "Bad Request":
      status = 400;
      message = err.message || "Bad Request";
      break;
    case "Not Found":
      status = 404;
      message = err.message || "Resource not found";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors?.[0]?.message || "Validation error";
      break;
  }

  if (status === 500 && err.message) {
    message = err.message;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
