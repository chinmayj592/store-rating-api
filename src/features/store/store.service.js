const prisma = require('../../config/database');
const { buildWhereClause } = require('../../utils/filtering');
const { getSortOrder } = require('../../utils/sorting');
const { getPagination } = require('../../utils/pagination');

const listStores = async (query, userId = null) => {
  const { skip, take, page, limit } = getPagination(query);
  const allowedFilters = ['name', 'address'];
  const where = buildWhereClause(query, allowedFilters);
  if (query.email) {
    where.email = { contains: query.email };
  }

  const orderBy = getSortOrder(query, 'store');

  const stores = await prisma.store.findMany({
    where,
    orderBy,
    skip,
    take,
    include: {
      ratings: {
        select: { rating: true, userId: true },
      },
    },
  });

  const total = await prisma.store.count({ where });

  const storeList = stores.map((store) => {
    const avgRating =
        store.ratings.length > 0
            ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.ratings.length
            : 0;

    let userRating = null;
    if (userId) {
      const userRatingEntry = store.ratings.find((r) => r.userId === userId);
      userRating = userRatingEntry ? userRatingEntry.rating : null;
    }

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: parseFloat(avgRating.toFixed(2)),
      userRating, // only for authenticated USER
    };
  });

  const pagination = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return { stores: storeList, pagination };
};

const getStoreById = async (storeId, userId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: {
      ratings: true,
    },
  });
  if (!store) throw new AppError('Store not found', 404);

  const avgRating =
      store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) /
          store.ratings.length
          : 0;

  let userRating = null;
  if (userId) {
    const entry = store.ratings.find((r) => r.userId === userId);
    userRating = entry ? entry.rating : null;
  }

  return {
    id: store.id,
    name: store.name,
    email: store.email,
    address: store.address,
    averageRating: parseFloat(avgRating.toFixed(2)),
    userRating,
  };
};

module.exports = { listStores, getStoreById };