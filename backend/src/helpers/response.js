export const response = (res, statusCode, ok, data, message) => {
  res.status(statusCode).send({ ok, data, message });
};
