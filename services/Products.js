const { create, getAllProducts } = require('../models/Products');

const dataProducts = (name, quantity) => {
  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' },
      status: 422 };
  }
  if (Math.sign(quantity) === -1 || Math.sign(quantity === 0)) {
    return { err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
      status: 422 };
  }
  if (name.length < 5) {
    return {
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
        status: 422 };
  }
  return false;
};

const addProduct = async (name, quantity) => {
  const bool = await (await getAllProducts()).some((product) => product.name === name);
  const verifyProduct = dataProducts(name, quantity);
  const result = await create(name, quantity);
  if (bool) {
    return { 
    err: { code: 'invalid_data', message: 'Product already exists' }, status: 422 };
  }
  if (verifyProduct) return dataProducts(name, quantity);

  return result;
};

module.exports = {
  addProduct,
};