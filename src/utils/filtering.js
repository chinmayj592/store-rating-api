const buildFilter = (query, fields = []) => {
  const where = {};
  fields.forEach((field) => {
    if (query[field]) {
      where[field] = { contains: query[field], mode: 'insensitive' };
    }
  });
  return where;
};

module.exports = { buildFilter };
