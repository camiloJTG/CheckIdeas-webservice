import bcrypt from 'bcrypt';

const generateSalt = async () => {
  const salt = await bcrypt.genSalt(10);
  return salt.toString();
};

export const generateHash = async (password) => {
  const salt = await generateSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const compare = async (textPlanePassword, hashPassword) => {
  const compare = await bcrypt.compare(textPlanePassword, hashPassword);
  return compare;
};
