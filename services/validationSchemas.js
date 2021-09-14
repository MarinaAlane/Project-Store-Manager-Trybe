const JOI = require('@hapi/joi');

const productSchema = JOI.object({
  name: JOI.string().min(5).required(),
  quantity: JOI.number().integer().min(1).required(),
});

module.exports = {
  productSchema,
};
