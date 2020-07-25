import {
  create,
  getByParams,
  getById,
  update,
} from '../libraries/database/mongo';
import { generateHash } from '../controllers/utils/bcrypt';

const COLLECTION = 'users';

export const getUser = async (id) => {
  const result = await getById(COLLECTION, id);
  const { _id, username, password, mail } = result;
  const newGetUser = { _id, username, password, mail };
  return { info: newGetUser, status: 200 };
};

export const createUser = async (data) => {
  const { mail, username, password } = data;
  const emailExist = await getByParams(COLLECTION, { mail: mail });
  const usernameExist = await getByParams(COLLECTION, { username: username });

  // Validate if mail exists
  if (emailExist.length !== 0) {
    return {
      info: `The email ${mail} is already registred. Please, try again with another mail`,
      status: 428,
    };
  }

  // Validate if username exists
  if (usernameExist.length !== 0) {
    return {
      info: `The username ${username} is already registred. Please, try again with another username`,
      status: 428,
    };
  }

  // Hashing password
  const hashPassword = await generateHash(password);

  // Creating user object
  const newUser = {
    username,
    password: hashPassword,
    mail,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const result = await create(COLLECTION, newUser);
  return { info: result, status: 201 };
};

export const updateUser = async (data, id) => {
  const { mail, username, password } = data;

  // User exists
  const userExists = await getById(COLLECTION, id);
  if (userExists === null) {
    return {
      info: `the id ${id} was not found in the database`,
      status: 404,
    };
  }

  // validate if mail or username was already registered
  if (mail || username) {
    if (userExists.mail === mail) {
      return {
        info: `The email ${mail} is already registred. Please, try again with another mail`,
        status: 428,
      };
    }
    if (userExists.username === username) {
      return {
        info: `The username ${username} is already registred. Please, try again with another username`,
        status: 428,
      };
    }
  }

  // hash password
  if (password) {
    const hashPassword = await generateHash(password);
    data.password = hashPassword;
  }

  // update data
  const newUser = {
    ...data,
    updatedAt: Date.now(),
  };
  const result = await update(COLLECTION, newUser, id);
  return {
    info: result,
    status: 200,
  };
};
