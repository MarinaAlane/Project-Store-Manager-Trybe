const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = db.collection('products').find().toArray();
  return products;
};

const getProductId = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const productId = db.collection('products').findOne({ _id: ObjectID(id) });
  return productId; // traz meu obj completo atravez do id
};

const getProductName = async (name) => {
  const db = await connection();
  const productName = db.collection('products').findOne({ name });
  if (!productName) {
  return null;
  }
  return productName;
};

const insertProducts = async (name, quantity) => {
  const db = await connection();
  const newProduct = db.collection('products').insertOne({ name, quantity })
    .then((result) => ({ _id: result.insertedId, name, quantity }));
  return newProduct;
};

const setUpdateProduct = async (id, name, quantity) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const updateProduct = db.collection('products')
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: { name, quantity } }, { upsert: true })
    .then(() => ({ _id: id, name, quantity }));
  return updateProduct;
};

const deleteProduct = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connection();
  const ToDelete = await getProductId(id); // null se is não é valido || obj completo atravez do id
  if (!ToDelete) return ToDelete; // esse retorno é igual a null
  await db.collection('products')
    .deleteOne({ _id: ObjectID(id) }); // deleto o obj atravez do id
  return ToDelete; // se chegou aqui, etão veio meu obj completo
};

module.exports = {
  getAll,
  insertProducts,
  getProductName,
  getProductId,
  setUpdateProduct,
  deleteProduct,
};