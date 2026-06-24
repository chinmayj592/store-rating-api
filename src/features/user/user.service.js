const prisma = require('../../config/database');
const AppError = require('../../utils/AppError');
const { getPagination, paginateMeta } = require('../../utils/pagination');
const { getSorting } = require('../../utils/sorting');
const { buildFilter } = require('../../utils/filtering');

const ALLOWED_SORT = ['name', 'email', 'createdAt'];
const SELECT = { id: true, name: true, email: true, address: true, role: true, createdAt: true };

const listUsers = async (query) => {
  const { skip, take, page, limit } = getPagination(query);
  const where = buildFilter(query, ['name', 'email']);
  if (query.role) where.role = query.role;

  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, select: SELECT, skip, take, orderBy: getSorting(query, ALLOWED_SORT) }),
    prisma.user.count({ where }),
  ]);
  return { users, meta: paginateMeta(total, page, limit) };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: { ...SELECT, ratings: { select: { value: true, store: { select: { id: true, name: true } } } } },
  });
  if (!user) throw new AppError('User not found', 404);
  return user;
};

module.exports = { listUsers, getUserById };
