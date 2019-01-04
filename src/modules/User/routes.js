/**
 * User Routes
 */

import express from 'express';
import validate from 'express-validation';

import createUser, { updateUser, deleteUser } from './controllers';
import { userValidation } from '../../services/validations';
import { authCheck } from '../Auth/utils';

const routes = express.Router();

routes.post('/', validate(userValidation.create), createUser);
routes.put(
  '/profile/:id',
  authCheck,
  validate(userValidation.update),
  updateUser,
);
routes.delete('/profile/:id', authCheck, deleteUser);
export default routes;
