import { getByParams } from '../libraries/database/mongo';
import { compare } from '../controllers/utils/bcrypt';
import { sign } from '../controllers/utils/jwt';

const COLLECTION = 'users';

export const getCredential = async (data) => {
  const { mail, password } = data;

  // Validate if mail exist
  const mailExists = await getByParams(COLLECTION, { mail });
  if (mailExists.length === 0) {
    return { info: 'Invalid credentials', status: 401 };
  }

  // Validate if password is valid
  const passwordValid = await compare(password, mailExists[0].password);
  if (!passwordValid) {
    return { info: 'Invalid credentials', status: 401 };
  }

  // Generate token
  const token = sign({
    id: mailExists[0]._id,
    mail: mailExists[0].mail,
    username: mailExists[0].username,
  });
  return { info: token, status: 200 };
};
