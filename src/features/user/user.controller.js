const userService = require('./user.service');
const asyncHandler = require('../../middleware/asyncHandler');
const ApiResponse = require('../../utils/ApiResponse');

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.listUsers(req.query);
  return ApiResponse.success(users)(req, res);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserDetails(parseInt(req.params.id, 10));
  return ApiResponse.success(user)(req, res);
});

module.exports = { getUsers, getUser };