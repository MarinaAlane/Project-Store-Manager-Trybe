// Onde tem as queries - contato direto com o banco
const { ObjectId } = require('bson');
const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const findName = await db.collection('products').findOne({ name });
  console.log(findName);
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  console.log(result);
  return { _id: result.insertedId, name, quantity };
};

// ref aula ao vivo  27.2
const getAllProducts = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();
  return products;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const productEdited = await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { id, name, quantity } },
  );
  return productEdited;
};

const deleteProduct = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const productToDelete = await getProductById(id);
    if (!productToDelete) return null;
    await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return productToDelete;
  };
  
module.exports = {
  create,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
