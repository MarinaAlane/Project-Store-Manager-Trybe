// conecta service com o model
const productsModel = require('../models/productsModel');

const postProduct = async (name, quantity) => {
  if (name.length < 5) return 'name less than 5';
  
  const searchByName = await productsModel.searchByName(name);
  if (searchByName) return 'Product already exists';

  if (typeof quantity !== 'number') return 'Not a Number';

  if (quantity <= 0) return 'quantity less or equal than 0';

  const product = await productsModel.postProduct(name, quantity);
  return product;
};

const getProductsByID = async (id) => {
  const productByID = await productsModel.getProductsByID(id);

  if (productByID === false || productByID === null) return 'Product not Found';

  return productByID;
};

const updateProductsByID = async (id, name, quantity) => {
  if (name.length < 5) return 'name less than 5';
  
  if (typeof quantity !== 'number') return 'Not a Number';

  if (quantity <= 0) return 'quantity less or equal than 0';

  const updateProduct = await productsModel.updateProductsByID(id, name, quantity);
  return updateProduct;
};

const deleteProductByID = async (id) => {
  const deleteProduct = await productsModel.deleteProductByID(id);

  if (deleteProduct === false || deleteProduct === null) return 'Product not Found';

  return deleteProduct;
};

module.exports = {
  postProduct,
  getProductsByID,
  updateProductsByID,
  deleteProductByID,
};
