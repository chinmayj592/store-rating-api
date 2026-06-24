const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');

const submitRating = async (storeId, userId, ratingValue) => {
  // Check if store exists
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) throw new AppError('Store not found', 404);

  // Check if user already rated this store
  const existing = await prisma.rating.findUnique({
    where: { userId_storeId: { userId, storeId } },
  });
  if (existing) {
    throw new AppError('You have already rated this store. Use the modify option.', 400);
  }

  const rating = await prisma.rating.create({
    data: {
      rating: ratingValue,
      userId,
      storeId,
    },
    select: {
      id: true,
      rating: true,
      userId: true,
      storeId: true,
    },
  });
  return rating;
};

const modifyRating = async (ratingId, userId, newRating) => {
  const rating = await prisma.rating.findUnique({ where: { id: ratingId } });
  if (!rating) throw new AppError('Rating not found', 404);
  if (rating.userId !== userId) {
    throw new AppError('You can only modify your own rating', 403);
  }

  const updated = await prisma.rating.update({
    where: { id: ratingId },
    data: { rating: newRating },
    select: { id: true, rating: true, userId: true, storeId: true },
  });
  return updated;
};

module.exports = { submitRating, modifyRating };