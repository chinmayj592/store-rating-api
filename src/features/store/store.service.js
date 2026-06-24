const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');
const { getPagination, paginateMeta } = require('../../utils/pagination');
const { getSorting } = require('../../utils/sorting');
const { buildFilter } = require('../../utils/filtering');

const ALLOWED_SORT = ['name', 'createdAt'];
const SELECT = {
  id: true, name: true, email: true, address: true, ownerId: true,
  ratings: { select: { value: true } },
};

const withAvgRating = (stores) =>
  stores.map(({ ratings, ...s }) => ({
    ...s,
    avgRating: ratings.length ? ratings.reduce((a, r) => a + r.value, 0) / ratings.length : null,
  }));

const listStores = async (query) => {
  const { skip, take, page, limit } = getPagination(query);
  const where = buildFilter(query, ['name', 'address']);

  const [stores, total] = await Promise.all([
    prisma.store.findMany({ where, select: SELECT, skip, take, orderBy: getSorting(query, ALLOWED_SORT) }),
    prisma.store.count({ where }),
  ]);
  return { stores: withAvgRating(stores), meta: paginateMeta(total, page, limit) };
};

const getStoreById = async (id) => {
  const store = await prisma.store.findUnique({ where: { id: Number(id) }, select: SELECT });
  if (!store) throw new AppError('Store not found', 404);
  const [{ ratings, ...s }] = withAvgRating([store]);
  return s;
};

const createStore = async (data) => prisma.store.create({ data, select: { id: true, name: true, email: true, address: true } });

const updateStore = async (id, data) => {
  const store = await prisma.store.findUnique({ where: { id: Number(id) } });
  if (!store) throw new AppError('Store not found', 404);
  return prisma.store.update({ where: { id: Number(id) }, data, select: { id: true, name: true, email: true, address: true } });
};

const deleteStore = async (id) => {
  const store = await prisma.store.findUnique({ where: { id: Number(id) } });
  if (!store) throw new AppError('Store not found', 404);
  await prisma.store.delete({ where: { id: Number(id) } });
};

module.exports = { listStores, getStoreById, createStore, updateStore, deleteStore };
