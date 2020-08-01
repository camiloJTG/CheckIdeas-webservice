import {
  create,
  getById,
  getByParams,
  update,
  remove,
  removeMany,
} from '../libraries/database/mongo';

const COLLECTION = 'items';
const COLLECTION_REF = 'lists';

export const createItems = async (data) => {
  const { listId } = data;

  // Validate if userId is valid
  const listExists = await getById(COLLECTION_REF, listId);
  if (Object.keys(listExists).length === 0) {
    return {
      info: `The list id ${listId} was not found in the database`,
      status: 404,
    };
  }
  const newItems = {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const result = await create(COLLECTION, newItems);
  return { info: result, status: 200 };
};

export const getAllItemsByListId = async (listId) => {
  // Validate if listId is valid
  const listExist = await getById(COLLECTION_REF, listId);
  if (Object.keys(listExist).length === 0) {
    return {
      info: `The list id ${listId} was not found in the database`,
      status: 404,
    };
  }

  // Get all lists by list id
  const result = await getByParams(COLLECTION, { listId });
  if (result.length === 0) {
    return { info: result, status: 404 };
  }
  return { info: result, status: 200 };
};

export const getOneItemByItemId = async (data) => {
  const { itemId, listId } = data;
  // Validate if list Id is valid
  const listExist = await getById(COLLECTION_REF, listId);
  if (Object.keys(listExist).length === 0) {
    return {
      info: `The list id ${listId} was not found in the database`,
      status: 404,
    };
  }

  // Validate if item id is valid
  const itemExists = await getById(COLLECTION, itemId);
  if (Object.keys(itemExists).length === 0) {
    return {
      info: `The item id ${itemId} was not found in the database`,
      status: 404,
    };
  }

  return { info: itemExists, status: 200 };
};

export const updateItem = async (id, data) => {
  const { listId } = data;

  // Validate if item id is valid
  const itemExists = await getById(COLLECTION, id);
  if (Object.keys(itemExists).length === 0) {
    return {
      info: `The item id ${id} was not found in the database`,
      status: 404,
    };
  }

  // Validate if list id is valid
  const listExists = await getById(COLLECTION_REF, listId);
  if (Object.keys(listExists).length === 0) {
    return {
      info: `The list id ${listId} was not found in the database`,
      status: 404,
    };
  }

  // Validate if item id and list id is agree
  const itemIdAndListIdIsAgree = await getByParams(COLLECTION, { id, listId });
  if (itemIdAndListIdIsAgree.length === 0) {
    return {
      info: `The list id ${listId} and the item id ${id} are not within the same collection`,
      status: 404,
    };
  }

  if (!data) {
    return { info: 'There is no data to change', status: 228 };
  }

  // Update list
  const updatedItem = { ...data, updatedAt: Date.now() };
  const result = await update(COLLECTION, updatedItem, id);
  return { info: result, status: 201 };
};

export const deleteItem = async (id) => {
  // Validate if item Id is valid
  const itemExists = await getById(COLLECTION, id);
  if (Object.keys(itemExists).length === 0) {
    return {
      info: `The item id ${id} was not found in the database`,
      status: 404,
    };
  }
  const result = await remove(COLLECTION, id);
  return { info: result, status: 200 };
};

export const deleteMany = async (listId) => {
  const result = await removeMany(COLLECTION, { listId });
  return { info: result, status: 200 };
};
