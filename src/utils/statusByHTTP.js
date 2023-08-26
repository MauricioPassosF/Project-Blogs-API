const codesHTTP = {
  SUCCESSFULL: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CREATED: 201,
  UNPROCESSABLE: 422,
  NO_CONTENT: 204,
};

const mapStatusHTTP = (status) => codesHTTP[status] || 500;

module.exports = {
  mapStatusHTTP,
};