/**
 * Provider Routes
 */

import express from 'express';
import validate from 'express-validation';

import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from './controllers';
import { categoryValidation } from '../../services/validations';
import { authCheck } from '../Auth/utils';

const routes = express.Router();

routes.get('/', authCheck, getAllCategories);

routes.post(
  '/',
  authCheck,
  validate(categoryValidation.create),
  createCategory,
);

routes.put(
  '/:id',
  authCheck,
  validate(categoryValidation.update),
  updateCategory,
);

routes.delete('/:id', authCheck, deleteCategory);

export default routes;
