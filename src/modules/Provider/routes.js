/**
 * Provider Routes
 */

import express from 'express';
import validate from 'express-validation';

import {
  createProvider,
  updateProvider,
  getProviderById,
  deleteProvider,
  getAllProviders,
} from './controllers';
import { providerValidation } from '../../services/validations';
import { authCheck } from '../Auth/utils';

const routes = express.Router();

/**
 * @get all Providers by current user id
 * @auth JWT + Token
 * @path url/providers
 */
routes.get('/', authCheck, getAllProviders);

/**
 * @get get provider by id
 * @auth JWT + Token
 * @path url/providers/:id
 */
routes.get('/:id', authCheck, getProviderById);

/**
 * @post create a provider
 * @auth JWT + Token
 * @path url/providers
 */
routes.post(
  '/',
  authCheck,
  validate(providerValidation.create),
  createProvider,
);

/**
 * @put update provider
 * @auth JWT + Token
 * @path url/providers/:id
 */
routes.put(
  '/:id',
  authCheck,
  validate(providerValidation.update),
  updateProvider,
);

/**
 * @get delete a provider
 * @auth JWT + Token
 * @path url/providers/:id
 */
routes.delete('/:id', authCheck, deleteProvider);

export default routes;
