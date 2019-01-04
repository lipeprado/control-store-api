import express from 'express';
import HTTPStatus from 'http-status';

// Middlewares
import APIError from '../services/error';
import logErrorService from '../services/log';

// Controllers
import UsersRoutes from '../modules/User/routes';
import AuthRoutes from '../modules/Auth/routes';
import ProviderRoutes from '../modules/Provider/routes';

const routes = express.Router();

routes.use('/users', UsersRoutes);
routes.use('/auth', AuthRoutes);
routes.use('/providers', ProviderRoutes);

routes.all('*', (req, res, next) => next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)));

routes.use(logErrorService);

export default routes;
