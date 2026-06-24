const bcrypt = require('bcryptjs');
const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');

const getDashboardStats = async () => {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);
  return { totalUsers, totalStores, totalRatings };
};

const createUser = async (data) => {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new AppError('Email already in use', 409);

  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashed },
    select: { id: true, name: true, email: true, role: true },
  });
};

module.exports = { getDashboardStats, createUser };
