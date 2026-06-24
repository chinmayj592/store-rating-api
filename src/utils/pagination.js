// Returns { skip, take } for Prisma
const getPagination = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  return { skip, take: limit, page, limit };
};

module.exports = { getPagination };