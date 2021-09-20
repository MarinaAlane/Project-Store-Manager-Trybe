const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result.ops[0]);

const getByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const getAll = () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = (id) => connection()
  .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray());

module.exports = {
  create,
  getByName,
  getAll,
  getById,
};
