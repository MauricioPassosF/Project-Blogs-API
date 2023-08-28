const codesHTTP = {
  SUCCESSFULL: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
};

const mapStatusHTTP = (status) => codesHTTP[status] || 500;

module.exports = {
  mapStatusHTTP,
};