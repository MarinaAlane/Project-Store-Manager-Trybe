const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: insertedId, name, quantity };
};

const findName = async (name) => {
  const search = await connection()
    .then((db) => db.collection('products').findOne({ name }));
  return search;
};

const getProducts = async () => {
  const products = await connection()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const getProduct = async (id) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return product;
};

module.exports = {
  createProduct,
  findName,
  getProducts,
  getProduct,
};