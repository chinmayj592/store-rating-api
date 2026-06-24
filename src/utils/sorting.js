const ALLOWED_ORDERS = ['asc', 'desc'];

const getSorting = (query, allowedFields = []) => {
  const { sortBy, order = 'asc' } = query;
  if (!sortBy || !allowedFields.includes(sortBy)) return undefined;
  return { [sortBy]: ALLOWED_ORDERS.includes(order) ? order : 'asc' };
};

module.exports = { getSorting };
