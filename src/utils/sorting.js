// Allowed sort fields for each model (whitelist)
const SORT_FIELDS = {
  user: ['name', 'email', 'createdAt'],
  store: ['name', 'email', 'address', 'createdAt'],
  rating: ['createdAt'],
};

const getSortOrder = (query, model) => {
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';
  const allowedFields = SORT_FIELDS[model] || [];
  const field = allowedFields.includes(sortBy) ? sortBy : 'createdAt';
  return { [field]: sortOrder };
};

module.exports = { getSortOrder };