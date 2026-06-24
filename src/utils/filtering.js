// Builds Prisma where clause from query string filters
const buildWhereClause = (query, allowedFields) => {
  const where = {};
  for (const field of allowedFields) {
    if (query[field]) {
      where[field] = { contains: query[field] };
    }
  }
  return where;
};

module.exports = { buildWhereClause };