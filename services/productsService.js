// Validações - regra de negócio

const productModel = require('../model/productModel');

const nameLength = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
  statusCode: 422,
};

const quantityLessThanOne = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
  statusCode: 422,
};

const quantityRequired = {
  err: { code: 'invalid_data', message: 'Quantity is required' },
  statusCode: 422,
};

const quantityIsANumber = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' },
  statusCode: 422,
};

const productExists = {
  err: { code: 'invalid_data', message: 'Product already exists' },
  statusCode: 422,
};

const createProduct = async (name, quantity) => {
  const newProducts = await productModel.create(name, quantity);
  console.log(newProducts);
  if (newProducts.statusCode === 422) return productExists;
    return { product: newProducts };
};

const create = async (name, quantity) => {
  if (name.length <= 5) return nameLength;
  if (quantity <= 0) return quantityLessThanOne;
  if (!quantity) return quantityRequired;
  if (typeof (quantity) !== 'number') return quantityIsANumber;
  const createProductvar = await createProduct(name, quantity);
  console.log(createProductvar);
  return createProductvar;
};

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
 const product = await productModel.getProductById(id);
 return product;
};

const update = async (id, name, quantity) => {
  if (name.length <= 5) return nameLength;
  if (quantity <= 0) return quantityLessThanOne;
  if (!quantity) return quantityRequired;
  if (typeof (quantity) !== 'number') return quantityIsANumber;
  const product = await productModel.updateProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => {
  const deletedProduct = await productModel.deleteProduct(id);
  if (!deletedProduct) return { status: 422, message: 'Wrong id format' };
  return { status: 200, data: deletedProduct };
};

module.exports = {
  create,
  getAllProducts,
  getProductById,
  update,
  deleteProduct,
};

// ref para a função delete https://github.com/tryber/sd-010-a-store-manager/pull/73/commits/88aa8c46928ca12886cd35542c5017d66bb7751c