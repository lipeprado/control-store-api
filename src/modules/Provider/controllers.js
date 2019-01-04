/* eslint-disable no-underscore-dangle */
import HTTPStatus from 'http-status';

import ProviderModel from './model';

export const getAllProviders = async (req, res, next) => {
  const currentUser = req.user;

  const query = { creator: currentUser.id };
  const options = {
    sort: { createdAt: -1 },
    lean: true,
    limit: 2,
  };
  try {
    const providers = await ProviderModel.paginate(query, options);
    return res.status(HTTPStatus.OK).json({ providers });
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }
  return next();
};

export const getProviderById = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.user;
  try {
    const provider = await ProviderModel.find({
      creator: currentUser.id,
      _id: id,
    }).populate('creator', '_id');
    return res.status(HTTPStatus.OK).json({ provider });
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }
  return next();
};

export const createProvider = async (req, res, next) => {
  const { name, email, details } = req.body;
  const currentUser = req.user;
  try {
    const provider = await ProviderModel.create({
      name,
      email,
      details,
      creator: currentUser.id,
    });
    return res
      .status(HTTPStatus.CREATED)
      .json({
        message: `Provider ${provider.name} was created with success`,
        provider,
      });
  } catch (error) {
    res.status(HTTPStatus.BAD_REQUEST).json({ error });
  }

  return next();
};

export const updateProvider = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;

  const { body } = req;
  try {
    const updatedProvider = await ProviderModel.findOneAndUpdate(
      {
        creator: currentUser.id,
        _id: id,
      },
      body,
      { new: true },
    );
    if (!updatedProvider) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: 'Provider not Found' });
    }

    return res.status(HTTPStatus.OK).json(updatedProvider);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};

export const deleteProvider = async (req, res, next) => {
  const currentUser = req.user;
  const { id } = req.params;
  try {
    const deletedProvider = await ProviderModel.findOneAndDelete({
      creator: currentUser.id,
      _id: id,
    });
    if (!deletedProvider) {
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ message: 'Provider not Found' });
    }
    return res
      .status(HTTPStatus.OK)
      .json({ message: 'Provider deleted with success.' });
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
};
