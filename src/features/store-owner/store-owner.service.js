const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');

const getOwnerDashboard = async (ownerId) => {
  const store = await prisma.store.findFirst({
    where: { ownerId },
    include: {
      ratings: {
        select: { value: true, user: { select: { id: true, name: true, email: true } }, createdAt: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  if (!store) throw new AppError('No store found for this owner', 404);

  const avgRating = store.ratings.length
    ? store.ratings.reduce((a, r) => a + r.value, 0) / store.ratings.length
    : null;

  return { store: { id: store.id, name: store.name, email: store.email, address: store.address }, avgRating, ratings: store.ratings };
};

module.exports = { getOwnerDashboard };
