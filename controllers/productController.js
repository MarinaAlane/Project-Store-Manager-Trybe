const productService = require('../services/productService');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body; 

  const product = await productService.addProduct(name, quantity);
  res.status(201).json(product);
};

const listProduct = async (req, res) => {
  const list = await productService.listProduct();
  res.status(200).json(list);
};

const listProductId = async (req, res) => {
  const productId = await productService.listProductId();
  res.status(200).json(productId);
};

module.exports = {
  addProduct,
  listProduct,
  listProductId,
};