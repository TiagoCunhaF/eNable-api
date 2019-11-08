import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProjectController from './app/controllers/ProjectController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import ProjectTransactionController from './app/controllers/ProjectTransactionController';
import DashboardController from './app/controllers/DashboardController';
import AverageCustController from './app/controllers/AverageCustController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateProjectStore from './app/validators/ProjectStore';
import validateProjectUpdate from './app/validators/ProjectUpdate';
import validateAppointmentStore from './app/validators/AppointmentStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);
const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);

routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  // bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', validateUserUpdate, UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/projects', ProjectController.index);
routes.get('/projects/:id', ProjectController.show);
routes.post('/projects', validateProjectStore, ProjectController.store);
routes.put('/projects/:id', validateProjectUpdate, ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

routes.get('/dashboard', DashboardController.index);
routes.get('/averageCust', AverageCustController.index);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', FileController.index);

routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/schedule', ScheduleController.index);

export default routes;
