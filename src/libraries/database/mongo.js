import { MongoClient, ObjectId } from 'mongodb';
import { config } from '../../config/config';

const URL = `mongodb+srv://${config.database.username}:${config.database.password}@${config.database.host}/${config.database.database}?retryWrites=true&w=majority`;

const connection = async () => {
  const connected = await MongoClient.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const db = connected.db(config.database.database);
  return db;
};

export const create = async (collection, data) => {
  const db = await connection();
  const result = await db.collection(collection).insertOne(data);
  return result.ops;
};

export const update = async (collection, data, id) => {
  const db = await connection();
  const result = await db
    .collection(collection)
    .updateOne({ _id: ObjectId(id) }, { $set: data });
  return result.modifiedCount;
};

export const remove = async (collection, id) => {
  const db = await connection();
  const result = await db
    .collection(collection)
    .deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
};

export const removeMany = async (collection, query) => {
  const db = await connection();
  const result = await db.collection(collection).deleteMany(query);
  return result.deletedCount;
};

export const getById = async (collection, id) => {
  const db = await connection();
  const result = await db.collection(collection).findOne({ _id: ObjectId(id) });
  return result || {};
};

export const getByParams = async (collection, query) => {
  const db = await connection();
  const { id, userId, listId } = query;
  if (id && userId) {
    const result = await db
      .collection(collection)
      .find({ _id: ObjectId(id), userId })
      .toArray();
    return result || [];
  }
  const result = await db.collection(collection).find(query).toArray();
  return result || [];
};

export const getAll = async (collection) => {
  const db = await connection();
  const result = await db.collection(collection).find().toArray();
  return result || [];
};
