const { ObjectID, ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectID.isValid(id)) return null;
  const db = await connect();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  console.log('model', sale);
  return sale;
};

const create = async (itensSold) => {
  const db = await connect();
  const sales = await db.collection('sales').insertOne({ itensSold });
  return { _id: sales.insertedId, itensSold };
};

module.exports = {
  getAll,
  create,
  getById,
};
