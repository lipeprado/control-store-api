/**
 * User controller
 */

import HTTPStatus from 'http-status';

import UserModel from '../User/model';
import { validPass, createToken } from './utils';

export default async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    const isValid = validPass(password, user.password);
    if (!isValid) return res.status(500).json({ message: 'Not Authorized' });
    if (isValid) {
      const token = createToken(user);
      return res.status(HTTPStatus.OK).json({ token });
    }
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }

  return next();
};
