const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  let status = 500;
  let message = "Internal Server Error";

  switch (err.name) {
    case "NotFound":
      status = 404;
      message = err.message || "Resource not found";
      break;
    case "Bad Request":
      status = 400;
      message = err.message || "Bad Request";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors?.[0]?.message || "Validation error";
      break;
    case "Unauthorized":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
    case "SyntaxError":
      status = 400;
      message = "Invalid JSON payload";
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
