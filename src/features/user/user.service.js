const prisma = require('../../config/database');
const { buildWhereClause } = require('../../utils/filtering');
const { getSortOrder } = require('../../utils/sorting');

const listUsers = async (query) => {
  const allowedFilters = ['name', 'email', 'address', 'role'];
  const where = buildWhereClause(query, allowedFilters);

  // role filter exact match? The spec says filter by Role, so we can do exact.
  if (query.role) {
    where.role = query.role;
  }

  const orderBy = getSortOrder(query, 'user');

  const users = await prisma.user.findMany({
    where,
    orderBy,
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
    },
  });

  return users;
};

const getUserDetails = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      store: {
        select: {
          ratings: {
            select: { rating: true },
          },
        },
      },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  let rating = null;
  if (user.role === 'STORE_OWNER' && user.store && user.store.ratings.length > 0) {
    const avg =
        user.store.ratings.reduce((sum, r) => sum + r.rating, 0) /
        user.store.ratings.length;
    rating = parseFloat(avg.toFixed(2));
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
    rating, // only for store owner
  };
};

module.exports = { listUsers, getUserDetails };