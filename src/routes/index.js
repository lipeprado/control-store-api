import express from 'express';
import HTTPStatus from 'http-status';

// Middlewares
import APIError from '../services/error';
import logErrorService from '../services/log';

// Controllers
import UsersRoutes from '../modules/User/routes';
import AuthRoutes from '../modules/Auth/routes';
import ProviderRoutes from '../modules/Provider/routes';
import CategoryRoutes from '../modules/Category/routes';

const routes = express.Router();

routes.use('/users', UsersRoutes);
routes.use('/auth', AuthRoutes);
routes.use('/providers', ProviderRoutes);
routes.use('/categories', CategoryRoutes);

routes.all('*', (req, res, next) => next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)));

routes.use(logErrorService);

export default routes;
