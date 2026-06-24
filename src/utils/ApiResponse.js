class ApiResponse {
  static success(data, message = 'Success', statusCode = 200) {
    return (req, res) => {
      res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    };
  }

  static paginated(data, pagination, message = 'Success') {
    return (req, res) => {
      res.status(200).json({
        success: true,
        message,
        data,
        pagination,
      });
    };
  }
}

module.exports = ApiResponse;