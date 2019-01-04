/* eslint-disable no-underscore-dangle */
/**
 * User controller
 */

import HTTPStatus from 'http-status';

import User from './model';
import isAllowed from '../../services/isAllowed';

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

export const updateUser = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;
  const userAuthorized = await isAllowed(currentUser.id, id);
  if (!userAuthorized) {
    return res
      .status(HTTPStatus.UNAUTHORIZED)
      .json({ message: 'UNAUTHORIZED' });
  }
  const { body } = req;
  try {
    const user = await User.findOneAndUpdate(id, body, {
      new: true,
    });

    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;
  const userAuthorized = await isAllowed(currentUser.id, id);
  if (!userAuthorized) {
    return res
      .status(HTTPStatus.UNAUTHORIZED)
      .json({ message: 'UNAUTHORIZED' });
  }
  try {
    await User.findOneAndDelete({ _id: currentUser.id });

    return res
      .status(HTTPStatus.OK)
      .json({ message: 'User was deleted with success.' });
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};
