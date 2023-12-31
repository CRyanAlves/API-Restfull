import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import SessionsController from '../controller/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.createSession
);

export default sessionsRouter