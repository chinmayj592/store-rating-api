const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');
const { getPagination } = require('../../utils/pagination');

const getDashboard = async (ownerId) => {
  // Find the store owned by this store owner
  const store = await prisma.store.findUnique({
    where: { ownerId },
    include: {
      ratings: {
        select: { rating: true, userId: true, user: { select: { name: true, email: true } } },
      },
    },
  });

  if (!store) {
    // Store owner without a store yet
    return {
      store: null,
      averageRating: 0,
      ratings: [],
      usersWhoRated: [],
    };
  }

  const avgRating =
      store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
          : 0;

  const usersWhoRated = store.ratings.map((r) => ({
    userId: r.userId,
    name: r.user.name,
    email: r.user.email,
    rating: r.rating,
  }));

  return {
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
    },
    averageRating: parseFloat(avgRating.toFixed(2)),
    usersWhoRated,
  };
};

module.exports = { getDashboard };