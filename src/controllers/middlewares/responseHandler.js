export const success = (req, res, message, status) => {
  const statusCode = status || 200;
  const statusMessage = message || '';
  res.status(statusCode).json({
    error: false,
    status: statusCode,
    body: statusMessage,
  });
};

export const error = (req, res, message, status) => {
  const statusCode = status || 500;
  const statusMessage =
    message || 'Internal Server Error. Please, try again later';
  res.status(status).json({
    error: true,
    status: statusCode,
    body: statusMessage,
  });
};
