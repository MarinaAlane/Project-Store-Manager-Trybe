const { ObjectId } = require('mongodb');
const getConnection = require('./connections');

const createSales = async (itensSold) => {
  const db = await getConnection();
  const newSold = await db.collection('sales').insertOne({ itensSold });
  console.log(itensSold);
  return { _id: newSold.insertedId, itensSold };
};

const getSalesId = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sales;
};

const getAllSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

module.exports = {
  createSales,
  getAllSales,
  getSalesId,
};