import { compareSync } from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import HTTPStatus from 'http-status';
import User from '../User/model';

const enviroment = dotenv.config();
const { JWT_SECRET } = enviroment.parsed;

export const validPass = (password, toCompare) => compareSync(password, toCompare);

export const createToken = (user) => {
  const token = jwt.sign(
    // eslint-disable-next-line no-underscore-dangle
    { id: user._id, email: user.email, firstName: user.firstName },
    JWT_SECRET,
    {
      expiresIn: '3d',
    },
  );
  return `JWT ${token}`;
};

export const verifyJWTToken = async token => jwt.verify(token, JWT_SECRET);

export const authCheck = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }
  const splitedToken = authorization.split(' ');

  const verify = await verifyJWTToken(splitedToken[1]);
  const userExists = await User.findById(verify.id);
  if (!userExists) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
    return false;
  }
  req.user = verify;
  next();
  return true;
};
