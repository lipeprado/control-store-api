/**
 * User Routes
 */

import express from 'express';
import validate from 'express-validation';

import login from './controllers';
import { userValidation } from '../../services/validations';

const routes = express.Router();

routes.post('/login', validate(userValidation.login), login);

export default routes;
