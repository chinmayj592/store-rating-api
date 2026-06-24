const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');

const submitRating = async (userId, { value, storeId }) => {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) throw new AppError('Store not found', 404);

  return prisma.rating.upsert({
    where: { userId_storeId: { userId, storeId } },
    update: { value },
    create: { value, userId, storeId },
    select: { id: true, value: true, storeId: true, userId: true },
  });
};

const getUserRatingForStore = async (userId, storeId) => {
  const rating = await prisma.rating.findUnique({
    where: { userId_storeId: { userId, storeId: Number(storeId) } },
  });
  if (!rating) throw new AppError('Rating not found', 404);
  return rating;
};

const deleteRating = async (userId, storeId) => {
  const rating = await prisma.rating.findUnique({
    where: { userId_storeId: { userId, storeId: Number(storeId) } },
  });
  if (!rating) throw new AppError('Rating not found', 404);
  await prisma.rating.delete({ where: { id: rating.id } });
};

module.exports = { submitRating, getUserRatingForStore, deleteRating };
