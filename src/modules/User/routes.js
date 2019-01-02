/**
 * User Routes
 */

import express from 'express';
import validate from 'express-validation';

import createUser from './controllers';
import { userValidation } from '../../services/validations';

const routes = express.Router();

routes.post('/', validate(userValidation.create), createUser);

export default routes;
