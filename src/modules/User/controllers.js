/**
 * User controller
 */

import HTTPStatus from 'http-status';

import User from './model';

export default async (req, res, next) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res
      .status(HTTPStatus.CREATED)
      .json({ message: `User ${user.firstName} was created with success` });
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};
