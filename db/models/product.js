const { ObjectId } = require('mongodb');
const connection = require('../index');

const create = async (name, quantity) => {
  const createProduct = await connection().then((db) =>
  db.collection('products').insertOne({ name, quantity }));
  const { _id } = createProduct.ops[0];
  return {
    ...createProduct.ops[0].name,
    _id,
  };
};

const findByName = async (name) => {
  const product = await connection().then((db) =>
  db.collection('products').findOne({ name }));
  return product;
};

const getProducts = async () => {
  const products = await connection().then((db) =>
  db.collection('products').find().toArray());
  return { products };
};

const getProduct = async (id) => {
  const product = await connection().then((db) =>
  db.collection('products').findOne(new ObjectId(id)));
  const { _id, name } = product;
  return { _id, ...name };
};

const updateProduct = async (id, data) => {
  await connection().then((db) =>
  db.collection('products')
  .findOneAndUpdate({ _id: id }, { $set: data }, { returnDocument: 'after' }))
  .then((result) => result.value);

  const newProduct = await connection().then((db) => db.collection('products')
  .findOne(new ObjectId(id)));

  return newProduct;
};

module.exports = {
  create,
  findByName,
  getProducts,
  getProduct,
  updateProduct,
};