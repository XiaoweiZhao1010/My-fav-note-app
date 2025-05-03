const sendError = (res, statusCode = 500, message = "Server error") => {
  return res.status(statusCode).json({ error: message });
};
module.exports = sendError;
