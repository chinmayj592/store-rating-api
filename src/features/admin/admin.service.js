const prisma = require('../../config/database');
const bcrypt = require('bcrypt');
const AppError = require('../../utils/AppError');

const getDashboardStats = async () => {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);

  return { totalUsers, totalStores, totalRatings };
};

const createUser = async (userData) => {
  const existing = await prisma.user.findUnique({ where: { email: userData.email } });
  if (existing) throw new AppError('Email already exists', 409);

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      address: userData.address,
      role: userData.role,
    },
    select: { id: true, name: true, email: true, role: true },
  });
  return user;
};

const createStore = async (storeData) => {
  const existing = await prisma.store.findUnique({ where: { email: storeData.email } });
  if (existing) throw new AppError('Store email already exists', 409);

  // If ownerId is provided, verify the user exists and has role STORE_OWNER
  if (storeData.ownerId) {
    const owner = await prisma.user.findUnique({
      where: { id: storeData.ownerId },
    });
    if (!owner) throw new AppError('Owner user not found', 404);
    if (owner.role !== 'STORE_OWNER')
      throw new AppError('Assigned owner must have role STORE_OWNER', 400);
  }

  const store = await prisma.store.create({
    data: {
      name: storeData.name,
      email: storeData.email,
      address: storeData.address,
      ownerId: storeData.ownerId || null,
    },
  });
  return store;
};

module.exports = { getDashboardStats, createUser, createStore };